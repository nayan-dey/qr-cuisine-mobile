import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DashboardNavigatorTabs } from "./DashboardNavigatorTabs";
import Loading from "~/screens/Loading/Loading";
import LocationPermissionScreen from "~/screens/Home/Location";
import NotificationPermissionScreen from "~/screens/Home/Notification";
import ManualLocation from "~/screens/Home/ManualLocation";
import useStartPermission from "~/hooks/useStartPermission";

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  const { initialScreen } = useStartPermission();
  if (!initialScreen) {
    return <Loading />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "push",
        animation: "simple_push",
      }}
      initialRouteName={initialScreen}
    >
      <Stack.Screen name="DashboardTabs" component={DashboardNavigatorTabs} />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
      <Stack.Screen
        name="NotificationPermission"
        component={NotificationPermissionScreen}
      />
      <Stack.Screen name="ManualLocation" component={ManualLocation} />
    </Stack.Navigator>
  );
};

export const DashboardNavigator = () => {
  return <DashboardStack />;
};
