import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export const SPACING = {
  SPACING_XXS: 2,
  SPACING_XS: 4,
  SPACING_SM: 8,
  SPACING_MD: 16,
  SPACING_LG: 24,
  SPACING_XL: 32,
  SPACING_2XL: 40,
  SPACING_3XL: 48,
  SPACING_RADIUS: 18,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} as const;

export type SPACING = keyof typeof SPACING;
