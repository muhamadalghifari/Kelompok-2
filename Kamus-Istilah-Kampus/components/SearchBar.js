import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari istilah..."
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f5f9",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
