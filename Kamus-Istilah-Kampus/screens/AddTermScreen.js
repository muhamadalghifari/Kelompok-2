import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const AddTermScreen = () => {
  const [istilah, setIstilah] = useState("");
  const [arti, setArti] = useState("");

  const handleSave = () => {
    if (!istilah || !arti) {
      alert("Harap isi semua kolom!");
      return;
    }
    console.log("Istilah:", istilah);
    console.log("Artinya:", arti);
    alert("✅ Istilah berhasil disimpan!");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Kotak Header mirip Home */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Tambah Istilah Baru</Text>
        <Text style={styles.headerSubtitle}>
          Tambahkan istilah kampus beserta artinya
        </Text>
      </View>

      {/* Card Form */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Istilah"
          placeholderTextColor="#888"
          value={istilah}
          onChangeText={setIstilah}
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Artinya"
          placeholderTextColor="#888"
          value={arti}
          onChangeText={setArti}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>💾 Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7ff",
    padding: 20,
  },
  headerBox: {
    backgroundColor: "#2f80ed",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  headerIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#e6efff",
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: "#f0f3ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d0d7ff",
    padding: 14,
    fontSize: 15,
    color: "#000",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2f80ed",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddTermScreen;
