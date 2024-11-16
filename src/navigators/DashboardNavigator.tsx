import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Icon } from "~/componenets/atoms/Icon";
import { COLORS } from "~/constants/Colors";

const Tab = createBottomTabNavigator();
export function DashboardNavigator() {
  const { bottom } = useSafeAreaInsets();
  const tabBarActiveTintColor = "#000";
  const tabBarInactiveTintColor = "#fff";
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { bottom }],
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="home"
              color={
                focused ? COLORS.COLOR_PRIMARY : COLORS.COLOR_TEXT_SECONDARY
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="user"
              color={
                focused ? COLORS.COLOR_PRIMARY : COLORS.COLOR_TEXT_SECONDARY
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const $tabBar: ViewStyle = {
  backgroundColor: COLORS.COLOR_BACKGROUND,
  borderTopColor: "#666",
};

const $tabBarItem: ViewStyle = {
  paddingTop: 15,
};

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
};
