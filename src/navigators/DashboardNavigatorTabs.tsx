import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import { Icon } from "~/componenets/atoms/Icon";
import { COLORS } from "~/constants/Colors";
import {
  Home as HomeIcon,
  LocationDiscover,
  Reserve,
  Profile as ProfileIcon,
} from "iconsax-react-native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Reserved from "~/screens/Reserved/Reserved";
import Explore from "~/screens/Explore/Explore";

const Tab = createBottomTabNavigator();
export function DashboardNavigatorTabs() {
  const tabBarActiveTintColor = "#000";
  const tabBarInactiveTintColor = COLORS.COLOR_BACKGROUND;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          // borderWidth: StyleSheet.hairlineWidth,
          overflow: "hidden",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: COLORS.COLOR_BORDER,
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
        name="Explore"
        component={Explore}
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

      <Tab.Screen
        name="Reserved"
        component={Reserved}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Reserve
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
                untranslatedText="Reserved"
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
              <ProfileIcon
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
                untranslatedText="Profile"
                preset="smallText"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
};
