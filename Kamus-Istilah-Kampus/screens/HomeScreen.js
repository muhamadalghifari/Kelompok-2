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
        <Text style={styles.title}>Kamus Istilah Kampus</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchBox}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Cari istilah..." />
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
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderColor: "#A5B4FC",
  },
  icon: {
    fontSize: 24,
    marginRight: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E3A8A",
    letterSpacing: 0.5,
  },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
