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
      <Text style={styles.title}>📘 Kamus Istilah Kampus</Text>
      <SearchBar value={search} onChangeText={setSearch} />
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E3A8A",
    textAlign: "center",
  },
});
