import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

const CategoryScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: "Akademik", icon: "📚" },
    { id: 2, name: "Keuangan", icon: "💰" },
    { id: 3, name: "Organisasi Mahasiswa", icon: "👥" },
    { id: 4, name: "Administrasi Kampus", icon: "📋" },
    { id: 5, name: "Teknologi & IT", icon: "💻" },
    { id: 6, name: "Lain-lain", icon: "📦" }
  ];

  const handlePressCategory = (category) => {
    // Navigasi ke halaman daftar istilah berdasarkan kategori
    navigation.navigate('TermList', { category: category.name });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handlePressCategory(item)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kategori Istilah 📝</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  listContainer: {
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#DBE2F8',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1E3A8A',
  },
});

export default CategoryScreen;
