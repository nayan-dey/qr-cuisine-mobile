import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { DashboardNavigator } from "./DashboardNavigator";
import { navigationRef } from "./Provider";
import { useAuth } from "~/context/AuthContext";
import Loading from "~/screens/Loading/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthNavigator } from "./AuthStack";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const background = "#fff";
  const { isAuthenticated, isLoading } = useAuth();
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
      }}
    >
      {isLoading ? (
        <Stack.Screen name="Loading" component={Loading} />
      ) : !isAuthenticated ? (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Demo" component={DashboardNavigator} />
      )}
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  useEffect(() => {
    const onBackPress = () => {
      const currentRoute = navigationRef.current?.getCurrentRoute()?.name;
      if (currentRoute && "Demo") {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  return <AppStack />;
};