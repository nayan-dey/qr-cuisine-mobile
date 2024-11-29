import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile";
import { Icon } from "~/componenets/atoms/Icon";
import { COLORS } from "~/constants/Colors";
import { Home as HomeIcon, LocationDiscover } from "iconsax-react-native";
import { TextComponent } from "~/componenets/atoms/TextComponent";

const Tab = createBottomTabNavigator();
export function DashboardNavigatorTabs() {
  const { bottom } = useSafeAreaInsets();
  const tabBarActiveTintColor = "#000";
  const tabBarInactiveTintColor = "#fff";
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarStyle: [$tabBar, { bottom }],
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <HomeIcon
                size={24}
                color={
                  focused ? COLORS.COLOR_PRIMARY : COLORS.COLOR_TEXT_SECONDARY
                }
                variant="Bulk"
              />
              <TextComponent
                style={{
                  color: focused
                    ? COLORS.COLOR_PRIMARY
                    : COLORS.COLOR_TEXT_SECONDARY,
                }}
                untranslatedText="Home"
                preset="smallText"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocationDiscover
                size={24}
                color={
                  focused ? COLORS.COLOR_PRIMARY : COLORS.COLOR_TEXT_SECONDARY
                }
                variant="Bulk"
              />
              <TextComponent
                style={{
                  color: focused
                    ? COLORS.COLOR_PRIMARY
                    : COLORS.COLOR_TEXT_SECONDARY,
                }}
                untranslatedText="Explore"
                preset="smallText"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const $tabBar: ViewStyle = {
  backgroundColor: COLORS.COLOR_OVERLAY,
  borderTopColor: "#666",
};

const $tabBarItem: ViewStyle = {
  paddingTop: 10,
};

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
};
