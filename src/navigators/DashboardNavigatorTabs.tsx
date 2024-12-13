import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import { COLORS } from "~/constants/Colors";
import {
  Home as HomeIcon,
  LocationDiscover,
  Reserve,
  Profile as ProfileIcon,
  NotificationBing,
  Scanner,
} from "iconsax-react-native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Reserved from "~/screens/Reserved/Reserved";
import Explore from "~/screens/Explore/Explore";
import { SPACING } from "~/constants/Spacing";
import { Image } from "expo-image";

const Tab = createBottomTabNavigator();

const CustomHeader = () => {
  return (
    <>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/main_logo_with_title.png")}
          style={{ height: 44, width: 110 }}
          contentFit="contain"
        />
        <View style={styles.rightSideItemsContainer}>
          <View style={styles.notificationIcon}>
            <NotificationBing color={COLORS.COLOR_TEXT_SECONDARY} size="24" />
          </View>
          <View style={styles.scanContainer}>
            <Scanner
              color={COLORS.COLOR_PRIMARY}
              size="24"
              variant="Bulk"
              style={{ marginRight: SPACING.SPACING_XS }}
            />
            <TextComponent
              preset="body"
              untranslatedText="Scan Table"
              style={{ color: COLORS.COLOR_PRIMARY }}
              weight="medium"
            />
          </View>
        </View>
      </View>
    </>
  );
};
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
          // header: () => <CustomHeader />,

          // headerShown: true,
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

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: SPACING.SPACING_LG,
    zIndex: 2,
    backgroundColor: COLORS.COLOR_BACKGROUND,
    paddingVertical: SPACING.SPACING_MD,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: SPACING.SPACING_2XL,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  rightSideItemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    height: 44,
    width: 44,
    borderRadius: 16,
    backgroundColor: COLORS.COLOR_SURFACE,
    alignItems: "center",
    justifyContent: "center",
  },
  scanContainer: {
    borderRadius: 16,
    backgroundColor: "#4CAF5040",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: SPACING.SPACING_SM,
    paddingVertical: SPACING.SPACING_SM + 4,
    marginLeft: SPACING.SPACING_XXS,
  },
});

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
};
