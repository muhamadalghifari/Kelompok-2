import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={placeholder || "Cari istilah..."} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
});
