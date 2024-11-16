import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPACING } from "~/constants/Spacing";
import { COLORS } from "~/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Pagination({
  navigation,
  currentIndex,
  handlePrevious,
  handleNext,
}) {
  const scalePrevious = useSharedValue(1);
  const opacityPrevious = useSharedValue(1);
  const animatedStylePrevious = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scalePrevious.value }],
      opacity: opacityPrevious.value,
    };
  });

  // Separate shared values for the "Next" button
  const scaleNext = useSharedValue(1);
  const opacityNext = useSharedValue(1);
  const animatedStyleNext = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleNext.value }],
      opacity: opacityNext.value,
    };
  });
  const handlePressIn = (scale, opacity) => {
    scale.value = withTiming(0.98, { duration: 50 });
    opacity.value = withTiming(0.8, { duration: 50 });
  };

  const handlePressOut = (scale, opacity) => {
    scale.value = withTiming(1, { duration: 50 });
    opacity.value = withTiming(1, { duration: 50 });
  };

  return (
    <>
      <View style={styles.bottomContainer}>
        {currentIndex === 0 ? (
          <View />
        ) : (
          <Animated.View style={animatedStylePrevious}>
            <Pressable
              onPressIn={() => handlePressIn(scalePrevious, opacityPrevious)}
              onPressOut={() => handlePressOut(scalePrevious, opacityPrevious)}
              disabled={currentIndex === 0}
              onPress={handlePrevious}
              style={styles.paginaionButtonPrevious}
            >
              <Image
                source={require("../../../assets/icons/leftArrow.svg")}
                style={{ height: 28, width: 28 }}
              />
            </Pressable>
          </Animated.View>
        )}

        <Animated.View style={animatedStyleNext}>
          <Pressable
            onPressIn={() => handlePressIn(scaleNext, opacityNext)}
            onPressOut={() => handlePressOut(scaleNext, opacityNext)}
            onPress={() => {
              if (currentIndex === 2) {
                navigation.replace("AuthNavigator", {
                  screen: "Welcome",
                });
                AsyncStorage.setItem("@onboardingCompleted", "true");
              }
              handleNext();
            }}
            style={styles.paginaionButton}
          >
            <Image
              source={require("../../../assets/icons/Frame.svg")}
              style={{ height: 28, width: 28 }}
            />
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    alignSelf: "center",
    bottom: 50,
    flexDirection: "row",
  },
  indicator: {
    height: 7,
    width: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.COLOR_PRIMARY_LIGHT,
    marginHorizontal: 3,
  },
  activeIndicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.COLOR_PRIMARY,
    marginHorizontal: 3,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.SPACING_LG,
    paddingVertical: 24,
    backgroundColor: COLORS.COLOR_BACKGROUND,
  },
  paginaionButton: {
    backgroundColor: COLORS.COLOR_PRIMARY,
    height: 56,
    width: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  paginaionButtonPrevious: {
    backgroundColor: COLORS.COLOR_BACKGROUND,
    height: 56,
    width: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth + 1,
    borderColor: COLORS.COLOR_PRIMARY,
  },
});
