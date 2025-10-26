import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Daftar Favorit kamu masih kosong 😅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, color: "#64748B" },
});
