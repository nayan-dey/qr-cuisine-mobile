import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPACING } from "~/constants/Spacing";
import { COLORS } from "~/constants/Colors";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Button from "~/componenets/atoms/AnimatedButton";
import { NotificationBing } from "iconsax-react-native";
import { StatusBar } from "expo-status-bar";

const NotificationPermissionScreen = ({ navigation }) => {
  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === "granted") {
        await AsyncStorage.setItem("notificationGranted", "true");
        navigation.replace("DashboardTabs");
      } else if (status === "denied") {
        await AsyncStorage.setItem("notificationGranted", "false");
        Alert.alert(
          "Permission Denied",
          "We need notification access to proceed. Please enable it in your device settings."
        );
      } else {
        await AsyncStorage.setItem("notificationGranted", "false");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };
  const orClick = async () => {
    navigation.replace("DashboardTabs");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.COLOR_BACKGROUND} style={"dark"} />
      <View style={styles.iconContainer}>
        <NotificationBing
          color={COLORS.COLOR_PRIMARY}
          size="60"
          variant="Bulk"
        />
      </View>
      <TextComponent
        preset="title"
        untranslatedText="Enable Notifications Access"
        weight="semiBold"
        style={{ marginBottom: SPACING.SPACING_MD }}
      />
      <TextComponent
        preset="body"
        untranslatedText="Enable notifications to receive real-time"
        color="COLOR_TEXT_SECONDARY"
      />
      <TextComponent
        preset="body"
        untranslatedText="updates."
        color="COLOR_TEXT_SECONDARY"
        style={{ marginBottom: SPACING.SPACING_LG }}
      />
      <Button
        titleUntranslated="Allow Notification"
        onPress={requestNotificationPermission}
        buttonStyle={{
          width: SPACING.SCREEN_WIDTH - 40,
          marginBottom: SPACING.SPACING_LG,
        }}
      />
      <TextComponent
        preset="body"
        untranslatedText="Maybe Later"
        weight="medium"
        style={{ color: COLORS.COLOR_PRIMARY }}
        onPress={orClick}
      />
    </View>
  );
};

export default NotificationPermissionScreen;

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
