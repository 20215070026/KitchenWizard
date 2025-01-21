import { db, storage } from '../firebase/firebase.Config';
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase/firebase.Config';

export class FirebaseService {
  static async saveAnalysisResult(imageUri, detectedItems, shoppingList) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Kullanıcı oturum açmamış');

      const imageBlob = await this.uriToBlob(imageUri);
      
      const storageRef = ref(storage, `refrigerator_photos/${user.uid}/${Date.now()}.jpg`);
      
      try {
        const uploadResult = await uploadBytes(storageRef, imageBlob);
        
        const imageUrl = await getDownloadURL(uploadResult.ref);

        const analysisRef = collection(db, 'analyses');
        const analysisData = {
          userId: user.uid,
          imageUrl,
          detectedItems,
          shoppingList,
          createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(analysisRef, analysisData);
        console.log('Analiz sonuçları kaydedildi:', docRef.id);

        return docRef.id;
      } catch (uploadError) {
        console.error('Fotoğraf yükleme hatası:', uploadError);
        throw uploadError;
      }
    } catch (error) {
      console.error('Analiz sonuçları kaydedilirken hata:', error);
      throw error;
    }
  }

  static async uriToBlob(uri) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('URI to Blob dönüşüm hatası:', error);
      throw error;
    }
  }

  static async getAnalysisHistory() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Kullanıcı oturum açmamış');

      const analysisRef = collection(db, 'analyses');
      const q = query(
        analysisRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const analyses = [];
      
      querySnapshot.forEach((doc) => {
        analyses.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return analyses;
    } catch (error) {
      console.error('Analiz geçmişi alınırken hata:', error);
      throw error;
    }
  }
} 