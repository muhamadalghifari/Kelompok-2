import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import TermCard from "../components/TermCard";
import { terms } from "../data/terms";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const filteredTerms = terms.filter((item) =>
    item.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📘 Kamus Istilah Kampus</Text>
        <Text style={styles.subtitle}>Temukan makna istilah kampus dengan mudah</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchBox}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="🔍 Cari istilah..."
        />
      </View>

      {/* Daftar istilah */}
      <FlatList
        data={filteredTerms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TermCard
            term={item.term}
            meaning={item.meaning}
            onPress={() => navigation.navigate("Detail", { term: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#3B82F6",
    borderRadius: 18,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#E0E7FF",
    letterSpacing: 0.4,
  },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
});
