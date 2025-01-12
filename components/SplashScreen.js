import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Splash ekranı 3 saniye gösterilecek, sonra Login ekranına geçilecek
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000); // 3 saniye sonra Login ekranına geçiş
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Tam ekran logo */}
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logo} 
        resizeMode="contain" // Görselin ekranı tamamen kaplaması için
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%', // Görsel genişliği ekran genişliğine eşit
    height: '100%', // Görsel yüksekliği ekran yüksekliğine eşit
  },
});

export default SplashScreen;
