import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Text,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomButton } from './common/CustomButton';
import { COLORS, SPACING, FONTS, SHADOWS } from '../theme/theme';
import { ImageAnalysisService } from '../services/ImageAnalysisService';
import LoadingScreen from './LoadingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UploadPhotoScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await ImageAnalysisService.initialize();
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Üzgünüz', 'Kamera izni olmadan bu özelliği kullanamazsınız.');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu.');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf seçilirken bir hata oluştu.');
    }
  };

  const analyzeImage = async (imageUri) => {
    try {
      setLoading(true);
      const detectedItems = await ImageAnalysisService.analyzeImage(imageUri);
      navigation.navigate('DetectedItems', { items: detectedItems });
    } catch (error) {
      Alert.alert('Hata', 'Görüntü analizi sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Fotoğrafınız analiz ediliyor..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Buzdolabı Fotoğrafı</Text>
        <Text style={styles.subtitle}>
          Buzdolabınızın içini analiz etmek için fotoğraf çekin veya galeriden seçin
        </Text>

        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Icon name="refrigerator-outline" size={100} color={COLORS.primary} />
            <Text style={styles.placeholderText}>Henüz fotoğraf seçilmedi</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Kamera ile Çek"
            onPress={takePhoto}
            fullWidth
            style={styles.button}
            icon="camera"
          />
          <CustomButton
            title="Galeriden Seç"
            onPress={pickImage}
            variant="outline"
            fullWidth
            style={styles.button}
            icon="image"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  imageContainer: {
    flex: 1,
    marginVertical: SPACING.xl,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginVertical: SPACING.xl,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  buttonContainer: {
    gap: SPACING.md,
  },
  button: {
    marginBottom: SPACING.sm,
  },
});

export default UploadPhotoScreen;
