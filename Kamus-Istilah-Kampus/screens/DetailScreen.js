import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { term } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{term.term}</Text>
      <Text style={styles.meaning}>{term.meaning}</Text>
      <Button title="Tambahkan ke Favorit" onPress={() => alert("Ditambahkan!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#1E3A8A", marginBottom: 10 },
  meaning: { fontSize: 18, color: "#334155", marginBottom: 20 },
});
