import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

const useStartPermission = () => {
  const [initialScreen, setInitialScreen] = useState(null);

  const checkPermissions = async () => {
    const { status: notificationStatus } =
      await Notifications.getPermissionsAsync();
    const { status: locationStatus } =
      await Location.getForegroundPermissionsAsync();

    console.log("Notification status:", notificationStatus);
    console.log("Location status:", locationStatus);

    if (notificationStatus === "granted") {
      await AsyncStorage.setItem("notificationGranted", "true");
    } else {
      await AsyncStorage.setItem("notificationGranted", "false");
    }

    if (locationStatus === "granted") {
      await AsyncStorage.setItem("locationGranted", "true");
    } else {
      const existingLocationData = await AsyncStorage.getItem(
        "@manual_location_data"
      );
      if (!existingLocationData) {
        await AsyncStorage.setItem("locationGranted", "false");
      }
    }

    const locationGranted = await AsyncStorage.getItem("locationGranted");
    const notificationGranted = await AsyncStorage.getItem(
      "notificationGranted"
    );

    if (locationGranted === "true" && notificationGranted === "true") {
      setInitialScreen("DashboardTabs");
    } else if (locationGranted !== "true") {
      setInitialScreen("LocationPermission");
    } else {
      setInitialScreen("NotificationPermission");
    }
  };

  const [displayCurrentAddress, setDisplayCurrentAddress] =
    useState("location not found");

  const [latLon, setLatLon] = useState({ latitude: null, longitude: null });

  const getCurrentLocation = async () => {
    const { status: locationStatus } =
      await Location.getForegroundPermissionsAsync();
    if (locationStatus == "granted") {
      const { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        const { latitude, longitude } = coords;
        setLatLon({ latitude, longitude }); // Save latitude and longitude

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of response) {
          let address = `${item.city}, ${item.region}`;
          setDisplayCurrentAddress(address);
          const jsonValue = JSON.stringify(item);
          AsyncStorage.setItem("@location_data", jsonValue);
        }
      }
    }
  };

  useEffect(() => {
    checkPermissions();
    getCurrentLocation();

    let locationSubscription = null;

    // Add listeners for real-time permission changes
    (async () => {
      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High },
        async () => {
          await checkPermissions(); // Re-check permissions when location changes
        }
      );
    })();

    const notificationSubscription =
      Notifications.addNotificationResponseReceivedListener(async () => {
        await checkPermissions(); // Re-check permissions when notifications are triggered
      });

    return () => {
      notificationSubscription?.remove();
      locationSubscription?.remove(); // Properly remove location subscription
    };
  }, []);

  return { initialScreen, displayCurrentAddress };
};

export default useStartPermission;
