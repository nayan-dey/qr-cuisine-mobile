import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPACING } from "~/constants/Spacing";
import { Location as LocationIcon } from "iconsax-react-native";
import { COLORS } from "~/constants/Colors";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Button from "~/componenets/atoms/AnimatedButton";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";

const LocationPermissionScreen = ({ navigation }) => {
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const { status: notificationStatus } =
        await Notifications.getPermissionsAsync();
      if (status === "granted") {
        await AsyncStorage.setItem("locationGranted", "true");
        if (notificationStatus === "granted") {
          navigation.replace("DashboardTabs");
        } else {
          navigation.replace("NotificationPermission");
        }
      } else if (status === "denied") {
        Alert.alert(
          "Permission Denied",
          "We need location access to proceed. Please enable it in your device settings."
        );
      } else {
        await AsyncStorage.setItem("locationGranted", "false");
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const orClick = async () => {
    navigation.replace("ManualLocation");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.COLOR_BACKGROUND} style={"dark"} />

      <View style={styles.iconContainer}>
        <LocationIcon color={COLORS.COLOR_PRIMARY} size="60" variant="Bulk" />
      </View>
      <TextComponent
        preset="title"
        untranslatedText="What is Your Location?"
        weight="semiBold"
        style={{ marginBottom: SPACING.SPACING_MD }}
      />
      <TextComponent
        preset="body"
        untranslatedText="We need your location to show available"
        color="COLOR_TEXT_SECONDARY"
      />
      <TextComponent
        preset="body"
        untranslatedText="nearby restaurant."
        color="COLOR_TEXT_SECONDARY"
        style={{ marginBottom: SPACING.SPACING_LG }}
      />
      <Button
        titleUntranslated="Allow Location Access"
        onPress={requestLocationPermission}
        buttonStyle={{
          width: SPACING.SCREEN_WIDTH - 40,
          marginBottom: SPACING.SPACING_LG,
        }}
      />
      <TextComponent
        preset="body"
        untranslatedText="Enter Location Manually"
        weight="medium"
        style={{ color: COLORS.COLOR_PRIMARY }}
        onPress={orClick}
      />
    </View>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.SPACING_LG,
    backgroundColor: COLORS.COLOR_BACKGROUND,
  },
  iconContainer: {
    height: 96,
    width: 96,
    borderRadius: 25,
    backgroundColor: COLORS.COLOR_SURFACE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.SPACING_LG,
  },
});
