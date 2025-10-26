import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function TermCard({ term, meaning, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.term}>{term}</Text>
      <Text style={styles.meaning}>{meaning}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E0E7FF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  term: { fontSize: 18, fontWeight: "bold", color: "#1E3A8A" },
  meaning: { fontSize: 15, color: "#334155" },
});
