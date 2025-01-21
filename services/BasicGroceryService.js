export class BasicGroceryService {
  static basicItems = {
    dairy: [
      { id: '1', name: 'Süt', category: 'Süt Ürünleri', minQuantity: 1 },
      { id: '2', name: 'Yumurta', category: 'Süt Ürünleri', minQuantity: 10 },
      { id: '3', name: 'Peynir', category: 'Süt Ürünleri', minQuantity: 1 },
      { id: '4', name: 'Yoğurt', category: 'Süt Ürünleri', minQuantity: 1 },
    ],
    fruits: [
      { id: '5', name: 'Elma', category: 'Meyve', minQuantity: 4 },
      { id: '6', name: 'Muz', category: 'Meyve', minQuantity: 3 },
      { id: '7', name: 'Portakal', category: 'Meyve', minQuantity: 4 },
    ],
    vegetables: [
      { id: '8', name: 'Domates', category: 'Sebze', minQuantity: 4 },
      { id: '9', name: 'Salatalık', category: 'Sebze', minQuantity: 3 },
      { id: '10', name: 'Soğan', category: 'Sebze', minQuantity: 2 },
      { id: '11', name: 'Patates', category: 'Sebze', minQuantity: 2 },
    ],
    beverages: [
      { id: '12', name: 'Su', category: 'İçecek', minQuantity: 4 },
      { id: '13', name: 'Meyve Suyu', category: 'İçecek', minQuantity: 1 },
    ],
    basics: [
      { id: '14', name: 'Ekmek', category: 'Temel Gıda', minQuantity: 1 },
      { id: '15', name: 'Tereyağı', category: 'Temel Gıda', minQuantity: 1 },
    ]
  };

  static getAllBasicItems() {
    return Object.values(this.basicItems).flat();
  }

  static getShoppingList(detectedItems) {
    const allBasicItems = this.getAllBasicItems();
    const detectedItemNames = detectedItems.map(item => item.name.toLowerCase());
    
    const missingItems = allBasicItems.filter(basicItem => 
      !detectedItemNames.includes(basicItem.name.toLowerCase())
    );

    const groupedMissingItems = missingItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    return groupedMissingItems;
  }
} 