import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Platform } from 'react-native';
import { COLORS, FONTS, SPACING } from '../theme/theme';

const LoadingScreen = ({ message = 'Fotoğrafınız analiz ediliyor...' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingBox}>
        <ActivityIndicator 
          size="large" 
          color={COLORS.primary} 
          style={styles.spinner} 
        />
        <Text style={styles.message}>{message}</Text>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  loadingBox: {
    backgroundColor: COLORS.card,
    padding: SPACING.xl,
    borderRadius: 16,
    alignItems: 'center',
    width: '90%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  message: {
    marginTop: SPACING.lg,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  spinner: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.surface,
    borderRadius: 2,
    marginTop: SPACING.xl,
    overflow: 'hidden',
  },
  progress: {
    width: '70%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});

export default LoadingScreen;
