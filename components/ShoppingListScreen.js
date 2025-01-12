import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function ShoppingListScreen({ route }) {
  const { detectedItems } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alışveriş Listem</Text>
      <FlatList
        data={detectedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.item}>{item}</Text>
            <TouchableOpacity>
              <Text style={styles.icon}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.icon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f7e6df" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 },
  item: { fontSize: 18, flex: 1 },
  icon: { fontSize: 20, marginHorizontal: 10 },
  button: { backgroundColor: "#d48b6a", padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18 },
});
