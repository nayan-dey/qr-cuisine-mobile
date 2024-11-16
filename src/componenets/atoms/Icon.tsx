import * as React from "react";
import { ComponentType } from "react";
import {
  ImageStyle,
  Pressable,
  StyleProp,
  PressableProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
// import { Image } from "expo-image";
import { icons } from "lucide-react-native";

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends PressableProps {
  icon: IconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  strokeWidth?: number;
  onPress?: PressableProps["onPress"];
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    strokeWidth,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (WrapperProps?.onPress ? Pressable : View) as ComponentType<
    PressableProps | ViewProps
  >;

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];
  const LucideIcon = iconRegistry[icon];
  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      {/* <Image style={$imageStyle} source={iconRegistry[icon]} /> */}
      <LucideIcon
        color={color}
        size={size}
        style={$imageStyle}
        strokeWidth={strokeWidth}
      />
    </Wrapper>
  );
}

export const iconRegistry = {
  home: icons.House,
  check: icons.Check,
  search: icons.Search,
  calender: icons.Calendar,
  user: icons.CircleUser,
  night: icons.MoonStar,
  day: icons.Sun,
  apple: icons.Apple,
  star: icons.Star,
  mic: icons.Mic,
  history: icons.History,
  arrowUpLeft: icons.ArrowUpLeft,
  settings: icons.Settings2,
  downArrow: icons.ChevronDown,
  heart: icons.Heart,
  gear: icons.Settings,
  gift: icons.Gift,
  bell: icons.Bell,
  globe: icons.Earth,
  share: icons.Share2,
  redirect: icons.MoveUpRight,
  rightArrow: icons.ChevronRight,
  support: icons.ShieldPlus,
  arrowRigth: icons.ArrowRight,
  arrowLeft: icons.ArrowLeft,
  eyeOpen: icons.Eye,
  eyeClose: icons.EyeOff,
};

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
};
