import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFavorite = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Error saving data", e);
  }
};

export const getFavorite = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (e) {
    console.log("Error reading data", e);
  }
};
