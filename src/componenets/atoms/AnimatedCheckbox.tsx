import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { Icon } from "../atoms/Icon";
import { COLORS } from "~/constants/Colors";
import { SPACING } from "~/constants/Spacing";

const AnimatedCheckbox = ({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) => {
  const animation = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const bg = COLORS.COLOR_SURFACE;
  const icon = COLORS.COLOR_BACKGROUND;
  const primaryAccent = COLORS.COLOR_PRIMARY;

  // Sync animation with checked prop
  useEffect(() => {
    Animated.timing(animation, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [checked]);

  const boxColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [bg, primaryAccent],
  });

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.COLOR_BORDER, "transparent"],
  });

  const checkmarkScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Animated.View
        style={[
          styles.checkbox,
          { backgroundColor: boxColor, borderColor: borderColor },
        ]}
      >
        <Animated.View
          style={[styles.checkmark, { transform: [{ scale: checkmarkScale }] }]}
        >
          <Icon icon="check" size={SPACING.SPACING_MD} color={icon} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth + 0.7,
  },
  checkmark: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimatedCheckbox;
