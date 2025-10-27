import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { term } = route.params;

  const handleAddFavorite = () => {
    alert("Ditambahkan ke Favorit!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{term.term}</Text>
        <Text style={styles.meaning}>{term.meaning}</Text>

        <TouchableOpacity style={styles.button} onPress={handleAddFavorite}>
          <Text style={styles.buttonText}>❤️ Tambahkan ke Favorit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 12,
  },
  meaning: {
    fontSize: 18,
    color: "#475569",
    marginBottom: 24,
    lineHeight: 26,
  },
  button: {
    backgroundColor: "#1E3A8A",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
