import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS, LAYOUT } from '../theme/theme';
import { CustomButton } from './common/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetectedItemsScreen = ({ navigation, route }) => {
  const { detectedItems = [], shoppingList = {}, message = '' } = route.params || {};

  const renderDetectedItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <Text style={styles.confidence}>
          Güven: %{Math.round(item.confidence * 100)}
        </Text>
      </View>
      <Icon name="check-circle" size={24} color={COLORS.success} />
    </View>
  );

  const renderShoppingListSection = () => {
    if (Object.keys(shoppingList).length === 0) {
      return (
        <View style={styles.shoppingListContainer}>
          <Text style={styles.sectionTitle}>Alışveriş Listesi</Text>
          <Text style={styles.emptyMessage}>
            {detectedItems.length > 0 
              ? 'Tüm temel ürünler buzdolabınızda mevcut!'
              : 'Fotoğrafta gıda ürünü algılanamadı.'}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.shoppingListContainer}>
        <Text style={styles.sectionTitle}>Alışveriş Listesi</Text>
        {Object.entries(shoppingList).map(([category, items]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {items.map(item => (
              <View key={item.id} style={styles.shoppingItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  Min: {item.minQuantity} adet
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analiz Sonucu</Text>
        <Text style={styles.subtitle}>{message}</Text>
      </View>

      {detectedItems.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Tespit Edilen Ürünler</Text>
          <FlatList
            data={detectedItems}
            renderItem={renderDetectedItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon 
            name="alert-circle-outline" 
            size={48} 
            color={COLORS.warning} 
          />
          <Text style={styles.emptyMessage}>
            Fotoğrafta gıda ürünü algılanamadı.
          </Text>
        </View>
      )}

      {renderShoppingListSection()}

      <View style={styles.footer}>
        <CustomButton
          title="Alışveriş Listesini Paylaş"
          onPress={() => {
            // Paylaşım fonksiyonu eklenecek
          }}
          fullWidth
          disabled={Object.keys(shoppingList).length === 0}
          icon="share-variant"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    ...SHADOWS.small,
  },
  title: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  list: {
    padding: SPACING.md,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: LAYOUT.borderRadius.medium,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  itemInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  itemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  itemQuantity: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    ...SHADOWS.small,
  },
  shoppingListContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.medium,
    margin: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  categorySection: {
    marginBottom: SPACING.lg,
  },
  categoryTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  shoppingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  confidence: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});

export default DetectedItemsScreen;
