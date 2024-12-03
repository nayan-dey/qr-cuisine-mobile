import {
  StyleSheet,
  View,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { SPACING } from "~/constants/Spacing";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Loading({ isStatusBarHidden = false }) {
  const insets = useSafeAreaInsets();
  const animationRef = useRef(null);

  const statusBarHeight =
    Platform.OS === "android" ? RNStatusBar.currentHeight || 0 : insets.top; // Safe area insets on iOS
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LottieView
        ref={animationRef}
        source={require("../../../assets/lottie/QR_loop.json")}
        loop={true}
        autoPlay={true}
        speed={1.5}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8ff",
  },
  animation: {
    width: SPACING.SCREEN_WIDTH + 300,
    height: SPACING.SCREEN_WIDTH + 300,
    top: 3,
  },
});
