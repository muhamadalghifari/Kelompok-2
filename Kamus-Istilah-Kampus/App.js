import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import AddTermScreen from "./screens/AddTermScreen";
import CategoryScreen from "./screens/CategoryScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator (menu bawah)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#F8FAFC",
          paddingBottom: 4,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Favorite") iconName = "heart-outline";
          else if (route.name === "AddTerm") iconName = "add-circle-outline";
          else if (route.name === "Category") iconName = "albums-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="AddTerm" component={AddTermScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
    </Tab.Navigator>
  );
}

// Stack untuk halaman Detail
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detail Istilah" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
