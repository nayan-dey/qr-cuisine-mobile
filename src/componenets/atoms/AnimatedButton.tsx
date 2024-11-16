import React from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
} from "react-native-reanimated";
import { COLORS } from "~/constants/Colors";
import { FONT_SIZE } from "~/constants/FontSize";
import { LINE_HEIGHT } from "~/constants/LineHeight";
import { SPACING } from "~/constants/Spacing";
import { TYPOGRAPHY } from "~/constants/Typography";
import { TxKeyPath } from "~/i18n/i18n";
import { translate } from "~/i18n/translate";

// Define prop types for custom styles and states
export interface ReanimatedButtonProps {
  title?: TxKeyPath;
  onPress: () => void;
  loading?: boolean; // Loading state
  error?: boolean; // Error state
  buttonStyle?: ViewStyle; // Customizable button style
  textStyle?: TextStyle; // Customizable text style
  containerStyle?: ViewStyle; // Optional container style
  disabled?: boolean; // Disable the button
  titleUntranslated?: string; // Optional untranslated title
}

const Button: React.FC<ReanimatedButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  error = false,
  buttonStyle,
  textStyle,
  containerStyle,
  titleUntranslated,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const jiggle = useSharedValue(0); // Jiggle value for error animation
  const indicatorScale = useSharedValue(0);
  // Animate the button scale and opacity (default animation)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateX: jiggle.value }],
      opacity: opacity.value,
    };
  });

  // Animate the text sliding out and ActivityIndicator appearing
  const textSlideStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: loading
            ? withTiming(-70, { duration: 200 })
            : withTiming(0, { duration: 200 }),
        },
      ],
      opacity: loading
        ? withTiming(0, { duration: 600 })
        : withTiming(1, { duration: 200 }),
    };
  });
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: indicatorScale.value }],
    };
  });

  const handlePressIn = () => {
    if (!loading) {
      scale.value = withTiming(0.98, { duration: 50 });
      opacity.value = withTiming(0.8, { duration: 50 });
    }
  };

  const handlePressOut = () => {
    if (!loading) {
      scale.value = withTiming(1, { duration: 50 });
      opacity.value = withTiming(1, { duration: 50 });
    }
  };

  const handlePress = () => {
    if (!loading) {
      onPress();
    }
  };
  React.useEffect(() => {
    if (loading) {
      indicatorScale.value = withTiming(1, { duration: 800 }); // Zoom-in on loading
    } else {
      indicatorScale.value = withTiming(0, { duration: 200 }); // Reset scale
    }
  }, [loading]);

  // Handle error animation (jiggle effect)
  React.useEffect(() => {
    if (error) {
      jiggle.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withRepeat(withTiming(10, { duration: 100 }), 5, true),

        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  return (
    <Pressable
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={containerStyle} // Optional container style
    >
      <Animated.View style={[styles.button, buttonStyle, animatedStyle]}>
        {loading ? (
          <View style={styles.loading}>
            <Animated.View style={indicatorStyle}>
              <ActivityIndicator color="white" />
            </Animated.View>
            <Animated.Text
              style={[
                styles.text,
                textStyle,
                textSlideStyle,
                {
                  position: "absolute",
                },
              ]}
            >
              {titleUntranslated ? titleUntranslated : translate(title)}
            </Animated.Text>
          </View>
        ) : (
          <Animated.Text style={[styles.text, textStyle, textSlideStyle]}>
            {titleUntranslated ? titleUntranslated : translate(title)}
          </Animated.Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

// Default styles for fallback if no props are provided
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.COLOR_PRIMARY,
    paddingVertical: SPACING.SPACING_SM,
    paddingHorizontal: SPACING.SPACING_LG,
    borderRadius: SPACING.SPACING_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    minHeight: SPACING.SPACING_3XL + 8,
  } as ViewStyle,
  text: {
    color: COLORS.COLOR_BACKGROUND,
    fontFamily: TYPOGRAPHY.PRIMARY.MEDIUM,
    fontSize: FONT_SIZE.FONT_BUTTON,
    lineHeight: LINE_HEIGHT.LINE_BUTTON,
  } as TextStyle,
  loading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
