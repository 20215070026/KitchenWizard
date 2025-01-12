import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FirebaseService } from '../services/FirebaseService';
import { COLORS, FONTS, SPACING, SHADOWS } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnalysisHistoryScreen = ({ navigation }) => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = async () => {
    try {
      const history = await FirebaseService.getAnalysisHistory();
      setAnalyses(history);
    } catch (error) {
      console.error('Geçmiş yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisItem = ({ item }) => (
    <TouchableOpacity
      style={styles.analysisCard}
      onPress={() => navigation.navigate('DetectedItems', {
        detectedItems: item.detectedItems,
        shoppingList: item.shoppingList,
        message: `${item.detectedItems.length} ürün tespit edildi`,
      })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
      <View style={styles.analysisInfo}>
        <Text style={styles.dateText}>
          {new Date(item.createdAt?.toDate()).toLocaleDateString('tr-TR')}
        </Text>
        <Text style={styles.itemCount}>
          {item.detectedItems.length} ürün tespit edildi
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color={COLORS.text.secondary} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={analyses}
        renderItem={renderAnalysisItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz analiz geçmişi bulunmuyor</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: SPACING.md,
  },
  analysisCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  analysisInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  dateText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  itemCount: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    fontWeight: FONTS.weights.medium,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});

export default AnalysisHistoryScreen; 