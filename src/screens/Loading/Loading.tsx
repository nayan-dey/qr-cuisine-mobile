import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { SPACING } from "~/constants/Spacing";

export default function Loading() {
  const animationRef = useRef(null);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("../../../assets/lottie/QR_loop.json")}
        loop={true}
        autoPlay={true}
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
    width: SPACING.SCREEN_WIDTH,
    height: SPACING.SCREEN_WIDTH,
  },
});
