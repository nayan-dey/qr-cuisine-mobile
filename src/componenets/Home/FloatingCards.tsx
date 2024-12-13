import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { COLORS } from "~/constants/Colors";
import { SPACING } from "~/constants/Spacing";
import { Card } from "~/screens/Explore/Explore";
import { ScrollView } from "react-native-gesture-handler";
import { Coffee } from "iconsax-react-native";
import { TextComponent } from "../atoms/TextComponent";
import { Image } from "expo-image";

interface WeatherProps {
  animatedPosition: Animated.SharedValue<number>;
  animatedIndex: Animated.SharedValue<number>;
}

const SPACE = 16;
const height = 64;

const FloatingCards = ({ animatedIndex, animatedPosition }: WeatherProps) => {
  const { height: screenHeight } = useSafeAreaFrame();

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const belowMiddlePosition = screenHeight - animatedPosition.value < height;
    return {
      opacity: interpolate(
        animatedIndex.value,
        [0, 1],
        [1, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: belowMiddlePosition
            ? animatedPosition.value - height - SPACE
            : screenHeight - height - 320 - SPACE,
        },
      ],
    };
  }, [animatedIndex.value, animatedPosition.value, screenHeight]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: "Cafes",
      icon: require("../../../assets/icons/cup.svg"),
    },
    {
      name: "QRC",
      icon: require("../../../assets/icons/res.svg"),
    },
    {
      name: "Bar & Grill",
      icon: require("../../../assets/icons/turkey.svg"),
    },
    {
      name: "Vegetarian",
      icon: require("../../../assets/icons/veges.svg"),
    },
  ];
  const handlePress = (category) => {
    setSelectedCategory(category.name);
  };
  return (
    <Animated.View
      //   onLayout={handleOnLayout}
      style={[styles.container, containerAnimatedStyle]}
    >
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.name;

          return (
            <Pressable
              key={index}
              onPress={() => handlePress(category)}
              style={[
                styles.categoryItem,
                {
                  backgroundColor: isSelected
                    ? "rgba(76, 175, 80, 0.25)"
                    : COLORS.COLOR_SURFACE,
                },
                {
                  borderColor: isSelected
                    ? "transparent"
                    : COLORS.COLOR_PRIMARY,
                  borderWidth: isSelected ? 0 : StyleSheet.hairlineWidth,
                },
              ]}
            >
              <Image
                source={categories[index].icon}
                style={{
                  width: 16,
                  height: 16,
                  marginRight: SPACING.SPACING_XS,
                }}
                contentFit="contain"
              />
              <TextComponent
                preset="caption"
                untranslatedText={category.name}
                style={{
                  color: isSelected
                    ? COLORS.COLOR_PRIMARY
                    : COLORS.COLOR_TEXT_SECONDARY,
                }}
              />
            </Pressable>
          );
        })}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            style={{
              marginRight: index == 4 ? 24 : SPACING.SPACING_MD,
              marginLeft: index == 0 ? 24 : 0,
            }}
            key={index}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    padding: 6,
    marginTop: 0,
    width: "100%",
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: SPACING.SPACING_SM,
    backgroundColor: COLORS.COLOR_BACKGROUND,
    height: 48,
    borderRadius: 16,
    padding: 6,
    gap: 6,
    width: SPACING.SCREEN_WIDTH - 48,
  },
  categoryItem: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
});

export default FloatingCards;
