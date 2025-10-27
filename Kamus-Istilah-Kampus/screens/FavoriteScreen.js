import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="heart-outline" size={64} color="#EF4444" />
        <Text style={styles.title}>Belum Ada Favorit</Text>
        <Text style={styles.subtitle}>
          Tambahkan item favorit kamu agar tampil di sini 💫
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Cari Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
