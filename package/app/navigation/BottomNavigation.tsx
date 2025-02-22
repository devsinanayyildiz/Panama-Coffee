import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Home from "../screens/Home/Home";
import Campaigns from "../screens/Campaigns/Campaigns.tsx";
import Stores from "../screens/Stores/Stores";
import Profile from "../screens/Profile/Profile";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const CustomTabButton: React.FC<{ children: React.ReactNode; onPress: () => void }> = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.tabButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {children}
  </TouchableOpacity>
);

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Kampanyalar") {
            iconName = "gift";
          } else if (route.name === "Magazalar") {
            iconName = "map-pin";
          } else if (route.name === "Profil") {
            iconName = "user";
          }
          return (
            <View style={styles.iconContainer}>
              {iconName && (
                <Icon
                  name={iconName}
                  size={25}
                  color={focused ? COLORS.primary : "gray"}
                />
              )}
              <Text style={{ color: focused ? COLORS.primary : "gray", fontSize: 7 }}>
                {route.name}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Kampanyalar" component={Campaigns} options={{ headerShown: false }} />
      <Tab.Screen name="Magazalar" component={Stores} options={{ headerShown: false }} />
      <Tab.Screen name="Profil" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 0,
    elevation: 10,
    height: 45,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomNavigation;
