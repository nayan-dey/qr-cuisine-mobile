import React, { useState } from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppNavigator } from "./AppNavigator";
import { useFonts } from "expo-font";
import AnimatedBootSplash from "../componenets/Splash";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "~/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import toastConfig from "~/utils/toastConfig";

export const navigationRef = createNavigationContainerRef();

export default function Provider() {
  const queryClient = new QueryClient();
  const [loaded] = useFonts({
    rethink_bold: require("../../assets/fonts/RethinkSans-Bold.ttf"),
    rethink_extrabold: require("../../assets/fonts/RethinkSans-ExtraBold.ttf"),
    rethink_medium: require("../../assets/fonts/RethinkSans-Medium.ttf"),
    rethink_regular: require("../../assets/fonts/RethinkSans-Regular.ttf"),
    rethink_semibold: require("../../assets/fonts/RethinkSans-SemiBold.ttf"),
  });
  const [isSplashVisible, setSplashVisible] = useState(true);
  // const [isLayoutReady, setLayoutReady] = useState(false);

  if (isSplashVisible && loaded) {
    return (
      <SafeAreaProvider>
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setTimeout(() => {
              setSplashVisible(false);
            }, 1500);
          }}
        />
      </SafeAreaProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <KeyboardProvider>
              {/* <SafeAreaView style={{ flex: 1 }}> */}
              {!isSplashVisible ? <AppNavigator /> : null}
              {/* </SafeAreaView> */}
            </KeyboardProvider>
          </AuthProvider>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
