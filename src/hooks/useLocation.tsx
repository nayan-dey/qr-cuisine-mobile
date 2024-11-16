import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import * as Location from "expo-location";
import { useQueryClient } from "@tanstack/react-query";

export const useLocation = () => {
  const quearyClient = useQueryClient();
  const [displayCurrentAddress, setDisplayCurrentAddress] =
    useState("location not found");
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const [latLon, setLatLon] = useState({ latitude: null, longitude: null });

  // Check if location is enabled or not
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    setLocationServicesEnabled(enabled);
    if (!enabled) {
      Alert.alert(
        "Location not enabled",
        "Please enable your Location services",
        [
          {
            text: "Cancel",
            onPress: () => {
              setDisplayCurrentAddress("Location services not enabled.");
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              Linking.openSettings(); // Open device settings
            },
          },
        ]
      );
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); // Request permission
    if (status !== "granted") {
      setLocationPermissionDenied(true); // Set flag if permission is denied
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => {
              setDisplayCurrentAddress(
                "Permission denied. Cannot fetch location."
              );
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              Linking.openSettings(); // Open app settings
            },
          },
        ]
      );
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      setLatLon({ latitude, longitude }); // Save latitude and longitude
      quearyClient.invalidateQueries(["handle-get-all-users"]);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.city}, ${item.region}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  return {
    displayCurrentAddress,
    locationServicesEnabled,
    locationPermissionDenied,
    latLon,
    getCurrentLocation,
  };
};
