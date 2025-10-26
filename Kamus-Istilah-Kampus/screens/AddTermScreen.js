import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function AddTermScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Istilah Baru</Text>
      <TextInput style={styles.input} placeholder="Istilah" />
      <TextInput style={styles.input} placeholder="Artinya" />
      <Button title="Simpan" onPress={() => alert("Istilah disimpan!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
});
