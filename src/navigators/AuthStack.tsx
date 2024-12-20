import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import Login from "../screens/Auth/Login";
import { navigationRef } from "./Provider";
import Welcome from "../screens/Auth/Welcome";
import OnboardingScreen from "~/screens/OnBoarding/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp from "~/screens/Auth/SignUp";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ForgotPassword from "~/screens/Auth/ForgotPassword";
import Otp from "~/screens/Auth/Otp";
import NewPassword from "~/screens/Auth/NewPassword";
import TermsAndConditions from "~/screens/Auth/TermsAndConditions";
import OtpClone from "~/screens/Auth/OtpClone";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { bottom, top } = useSafeAreaInsets();

  const background = "#fff";
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false);
  useEffect(() => {
    const getOnboardingStatus = async () => {
      const onboardingCompleted = await AsyncStorage.getItem(
        "@onboardingCompleted"
      );

      if (onboardingCompleted) {
        setOnboardingCompleted(true);
      }
    };
    getOnboardingStatus();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: background,
        animationTypeForReplace: "push",
        animation: "simple_push",
      }}
    >
      {!isOnboardingCompleted && (
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="OtpClone" component={OtpClone} />
    </Stack.Navigator>
  );
};

export const AuthNavigator = () => {
  return <AuthStack />;
};
