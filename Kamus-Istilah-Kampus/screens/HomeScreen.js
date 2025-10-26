import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kamus Istilah Kampus 📘</Text>
      <Button title="Lihat Detail" onPress={() => navigation.navigate("Detail")} />
      <Button title="Favorit" onPress={() => navigation.navigate("Favorite")} />
      <Button title="Tambah Istilah" onPress={() => navigation.navigate("AddTerm")} />
      <Button title="Kategori" onPress={() => navigation.navigate("Category")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
