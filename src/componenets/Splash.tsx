// import { StatusBar } from "expo-status-bar";
// import { useState } from "react";
// import {
//   Animated,
//   Image,
//   Platform,
//   StatusBar as RNStatusBar,
// } from "react-native";
// import BootSplash from "react-native-bootsplash";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// type Props = {
//   onAnimationEnd: () => void;
// };

// export default function AnimatedBootSplash({ onAnimationEnd }: Props) {
//   const [opacity] = useState(() => new Animated.Value(1));
//   const insets = useSafeAreaInsets();

//   const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
//     manifest: require("../../assets/bootsplash/manifest.json"),
//     logo: require("../../assets/bootsplash/logo.png"),
//     statusBarTranslucent: true,
//     navigationBarTranslucent: true,
//     animate: () => {
//       Animated.timing(opacity, {
//         useNativeDriver: true,
//         toValue: 0,
//         duration: 500,
//       }).start(() => {
//         onAnimationEnd();
//       });
//     },
//   });
//   const statusBarHeight =
//     Platform.OS === "android" ? RNStatusBar.currentHeight || 0 : insets.top; // Safe area insets on iOS

//   return (
//     <Animated.View
//       {...container}
//       style={[
//         container.style,
//         {
//           bottom: statusBarHeight, // Adjust based on status bar height
//         },
//       ]}
//     >
//       <StatusBar translucent={true} backgroundColor="transparent" />
//       <Image {...logo} style={{ height: 180, width: 180 }} />
//       {/* <Image {...brand} /> */}
//     </Animated.View>
//   );
// }
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Animated, Platform } from "react-native";
import BootSplash from "react-native-bootsplash";

const useNativeDriver = Platform.OS !== "web";

type Props = {
  onAnimationEnd: () => void;
};

export default function AnimatedBootSplash({ onAnimationEnd }: Props) {
  const [opacity] = useState(() => new Animated.Value(1));
  const [scale] = useState(() => new Animated.Value(1)); // Initial scale is 1 (normal size)

  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require("../../assets/bootsplash/manifest.json"),
    logo: require("../../assets/bootsplash/logo.png"),
    // darkLogo: require("../assets/bootsplash/dark-logo.png"),
    // brand: require("../assets/bootsplash/brand.png"),
    // darkBrand: require("../assets/bootsplash/dark-brand.png"),

    // statusBarTranslucent: true,
    // navigationBarTranslucent: true,

    animate: () => {
      Animated.parallel([
        Animated.timing(scale, {
          useNativeDriver,
          toValue: 10, // Zoom to 1.5x size
          duration: 400,
        }),
        Animated.timing(opacity, {
          useNativeDriver,
          toValue: 0, // Fade out to 0 opacity
          duration: 300,
        }),
      ]).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, { opacity }]}>
      <StatusBar hidden />
      <Animated.Image
        {...logo}
        style={[
          logo.style,
          {
            transform: [{ scale }], // Apply the scale animation
            height: 180,
            width: 180,
          },
        ]}
      />

      {/* <Animated.Image {...brand} style={[brand.style, { opacity }]} /> */}
    </Animated.View>
  );
}
