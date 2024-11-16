import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  Platform,
  PixelRatio,
} from "react-native";
import Animated from "react-native-reanimated";
import { COLORS } from "~/constants/Colors";
import { FONT_SIZE } from "~/constants/FontSize";
import { SPACING } from "~/constants/Spacing";
import { TYPOGRAPHY } from "~/constants/Typography";
import { TxKeyPath } from "~/i18n/i18n";
import { translate } from "~/i18n/translate";
type colorProps =
  | "COLOR_TEXT_PRIMARY"
  | "COLOR_TEXT_SECONDARY"
  | "COLOR_TEXT_INVERSE";

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof $fontWeightStyles;
type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  text?: TxKeyPath;
  style?: StyleProp<TextStyle>;
  preset?: Presets;
  weight?: Weights;
  color?: colorProps;
  size?: Sizes;
  children?: React.ReactNode;
  animated?: boolean;
  untranslatedText?: string;
}

// Based on iPhone 5s's scale (375)
const scale = SPACING.SCREEN_WIDTH / 375;

// Normalize function to scale sizes
export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function TextComponent(props: TextProps) {
  const AnimatedRNText = Animated.createAnimatedComponent(RNText);
  const {
    weight,
    size,
    text,
    children,
    color,
    animated,
    untranslatedText,
    style: $styleOverride,
    ...rest
  } = props;

  const content = untranslatedText ? untranslatedText : translate(text || "");

  const preset: Presets = props.preset ?? "default";
  const $styles: StyleProp<TextStyle> = [
    ...$presets[preset],
    color && {
      color: COLORS[color as keyof typeof COLORS],
    },
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride,
  ];
  if (animated) {
    return (
      <AnimatedRNText {...rest} style={$styles}>
        {content}
        {children}
      </AnimatedRNText>
    );
  }
  return (
    <RNText {...rest} style={[$styles]}>
      {content}
      {children}
    </RNText>
  );
}
const normalizedSize = {
  large: normalize(FONT_SIZE.FONT_LARGE_TITLE),
  title: normalize(FONT_SIZE.FONT_TITLE),
  subtitle: normalize(FONT_SIZE.FONT_SUBTITLE),
  body: normalize(FONT_SIZE.FONT_BODY),
  small: normalize(FONT_SIZE.FONT_SMALL_TEXT),
  caption: normalize(FONT_SIZE.FONT_CAPTION),
  button: normalize(FONT_SIZE.FONT_BUTTON),
  overline: normalize(FONT_SIZE.FONT_OVERLINE),
  placeholder: normalize(FONT_SIZE.FONT_PLACEHOLDER),
};
const $sizeStyles = {
  FONT_LARGE_TITLE: {
    fontSize: normalizedSize.large,
    lineHeight: normalizedSize.large + 6,
  } satisfies TextStyle,
  FONT_TITLE: {
    fontSize: normalizedSize.title,
    lineHeight: normalizedSize.title + 8,
  } satisfies TextStyle,
  FONT_SUBTITLE: {
    fontSize: normalizedSize.subtitle,
    lineHeight: normalizedSize.subtitle + 4,
  } satisfies TextStyle,
  FONT_BODY: {
    fontSize: normalizedSize.body,
    lineHeight: normalizedSize.body + 8,
  } satisfies TextStyle,
  FONT_SMALL_TEXT: {
    fontSize: normalizedSize.small,
    lineHeight: normalizedSize.small + 6,
  } satisfies TextStyle,
  FONT_CAPTION: {
    fontSize: normalizedSize.caption,
    lineHeight: normalizedSize.caption + 4,
  } satisfies TextStyle,
  FONT_BUTTON: {
    fontSize: normalizedSize.button,
    lineHeight: normalizedSize.button + 4,
  } satisfies TextStyle,
  FONT_OVERLINE: {
    fontSize: normalizedSize.overline,
    lineHeight: normalizedSize.overline + 4,
  } satisfies TextStyle,
  FONT_PLACEHOLDER: {
    fontSize: normalizedSize.placeholder,
    lineHeight: normalizedSize.placeholder + 6,
  } satisfies TextStyle,
};

const $fontWeightStyles = {
  regular: {
    fontFamily: TYPOGRAPHY.PRIMARY.REGULAR,
  } satisfies TextStyle,
  medium: {
    fontFamily: TYPOGRAPHY.PRIMARY.MEDIUM,
  } satisfies TextStyle,
  bold: { fontFamily: TYPOGRAPHY.PRIMARY.BOLD } satisfies TextStyle,
  extraBold: { fontFamily: TYPOGRAPHY.PRIMARY.EXTRABOLD } satisfies TextStyle,
  semiBold: { fontFamily: TYPOGRAPHY.PRIMARY.SEMIBOLD } satisfies TextStyle,
};
const $colorStyles = {
  TEXT_PRIMARY: { color: COLORS.COLOR_TEXT_PRIMARY } satisfies TextStyle,
  TEXT_SECONDARY: { color: COLORS.COLOR_TEXT_SECONDARY } satisfies TextStyle,
  TEXT_PLACEHOLDER: { color: "#e7e7e7" } satisfies TextStyle,
  TEXT_INVERSE: { color: COLORS.COLOR_TEXT_INVERSE } satisfies TextStyle,
  TEXT_ERROR: { color: COLORS.COLOR_ERROR } satisfies TextStyle,
  TEXT_SUCCESS: { color: COLORS.COLOR_SUCCESS } satisfies TextStyle,
  TEXT_WARNING: { color: COLORS.COLOR_WARNING } satisfies TextStyle,
  PRIMARY: { color: COLORS.COLOR_PRIMARY } satisfies TextStyle,
  SECONDARY: { color: COLORS.COLOR_SECONDARY } satisfies TextStyle,
};
const $baseStyle: StyleProp<TextStyle> = {};

const $presets = {
  default: [$baseStyle],
  largeTitle: [
    $baseStyle,
    $sizeStyles.FONT_LARGE_TITLE,
    $fontWeightStyles.bold,
    $colorStyles.TEXT_PRIMARY,
  ] as StyleProp<TextStyle>,
  title: [
    $baseStyle,
    $sizeStyles.FONT_TITLE,
    $fontWeightStyles.medium,
    $colorStyles.TEXT_PRIMARY,
  ] as StyleProp<TextStyle>,
  subtitle: [
    $baseStyle,
    $sizeStyles.FONT_SUBTITLE,
    $fontWeightStyles.regular,
    $colorStyles.TEXT_PRIMARY,
  ] as StyleProp<TextStyle>,
  body: [
    $baseStyle,
    $sizeStyles.FONT_BODY,
    $fontWeightStyles.regular,
    $colorStyles.TEXT_PRIMARY,
  ] as StyleProp<TextStyle>,
  smallText: [
    $baseStyle,
    $sizeStyles.FONT_SMALL_TEXT,
    $fontWeightStyles.regular,
    $colorStyles.TEXT_SECONDARY,
  ] as StyleProp<TextStyle>,
  caption: [
    $baseStyle,
    $sizeStyles.FONT_CAPTION,
    $fontWeightStyles.regular,
    $colorStyles.TEXT_PRIMARY,
  ] as StyleProp<TextStyle>,
  button: [
    $baseStyle,
    $sizeStyles.FONT_BUTTON,
    $fontWeightStyles.medium,
    $colorStyles.TEXT_PRIMARY,
  ] as StyleProp<TextStyle>,
  overline: [
    $baseStyle,
    $sizeStyles.FONT_OVERLINE,
    $fontWeightStyles.regular,
    $colorStyles.TEXT_SECONDARY,
  ] as StyleProp<TextStyle>,
  placeholder: [
    $baseStyle,
    $sizeStyles.FONT_PLACEHOLDER,
    $fontWeightStyles.regular,
    $colorStyles.TEXT_PLACEHOLDER,
  ] as StyleProp<TextStyle>,
  error: [
    $baseStyle,
    $sizeStyles.FONT_BODY,
    $fontWeightStyles.medium,
    $colorStyles.TEXT_ERROR,
  ] as StyleProp<TextStyle>,
  success: [
    $baseStyle,
    $sizeStyles.FONT_CAPTION,
    $fontWeightStyles.medium,
    $colorStyles.TEXT_SUCCESS,
  ] as StyleProp<TextStyle>,
  warning: [
    $baseStyle,
    $sizeStyles.FONT_CAPTION,
    $fontWeightStyles.medium,
    $colorStyles.TEXT_WARNING,
  ] as StyleProp<TextStyle>,
};
