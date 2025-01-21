import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';
import { BasicGroceryService } from './BasicGroceryService';
import { FirebaseService } from './FirebaseService';

export class ImageAnalysisService {
  static model = null;

  static foodItems = [
    'banana', 'apple', 'orange', 'carrot', 'broccoli', 'hot dog', 'pizza',
    'donut', 'cake', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon',
    'bowl', 'sandwich', 'hamburger', 'pizza', 'egg', 'milk', 'cheese',
    'yogurt', 'bread', 'butter'
  ];

  static async initialize() {
    try {
      await tf.ready();
      this.model = await cocoSsd.load();
      console.log('TensorFlow.js ve COCO-SSD modeli başarıyla yüklendi');
      return true;
    } catch (error) {
      console.error('Model yüklenirken hata:', error);
      return false;
    }
  }

  static async analyzeImage(imageUri) {
    try {
      const processedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: 640, height: 480 } }],
        { format: 'jpeg' }
      );

      const imgB64 = await FileSystem.readAsStringAsync(processedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
      const imageTensor = decodeJpeg(raw);

      const predictions = await this.model.detect(imageTensor);

      const foodPredictions = predictions.filter(prediction => 
        this.foodItems.includes(prediction.class.toLowerCase())
      );

      if (foodPredictions.length === 0) {
        return {
          detectedItems: [],
          shoppingList: {},
          message: "Fotoğrafta gıda ürünü algılanamadı."
        };
      }

      const detectedItems = foodPredictions.map(prediction => ({
        id: Math.random().toString(),
        name: this.translateLabel(prediction.class),
        confidence: prediction.score,
        quantity: '1 adet',
        bbox: prediction.bbox,
      }));

      const shoppingList = BasicGroceryService.getShoppingList(detectedItems);

      const result = {
        detectedItems,
        shoppingList: shoppingList || {},
        message: detectedItems.length > 0 
          ? `${detectedItems.length} adet gıda ürünü tespit edildi.`
          : "Fotoğrafta gıda ürünü algılanamadı."
      };

      // Firebase'e kaydet
      if (detectedItems.length > 0) {
        try {
          const analysisId = await FirebaseService.saveAnalysisResult(
            imageUri,
            detectedItems,
            shoppingList
          );
          result.analysisId = analysisId;
        } catch (firebaseError) {
          console.error('Firebase kayıt hatası:', firebaseError);
        }
      }

      return result;
    } catch (error) {
      console.error('Görüntü analizi sırasında hata:', error);
      return {
        detectedItems: [],
        shoppingList: {},
        message: "Görüntü analizi sırasında bir hata oluştu."
      };
    }
  }

  static translateLabel(label) {
    const translations = {
      'banana': 'Muz',
      'apple': 'Elma',
      'orange': 'Portakal',
      'carrot': 'Havuç',
      'broccoli': 'Brokoli',
      'bottle': 'Şişe',
      'cup': 'Bardak',
      'bowl': 'Kase',
      'milk': 'Süt',
      'egg': 'Yumurta',
      'cheese': 'Peynir',
      'yogurt': 'Yoğurt',
      'bread': 'Ekmek',
      'butter': 'Tereyağı',
      'water': 'Su',
      'juice': 'Meyve Suyu',
      'tomato': 'Domates',
      'cucumber': 'Salatalık',
      'onion': 'Soğan',
      'potato': 'Patates',
      'sandwich': 'Sandviç',
      'hamburger': 'Hamburger',
      'pizza': 'Pizza',
      'hot dog': 'Sosis',
      'donut': 'Donut',
      'cake': 'Pasta',
    };
    return translations[label.toLowerCase()] || label;
  }
} 