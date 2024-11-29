// import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
// import React, { useRef, useState } from "react";
// import { useAuth } from "~/context/AuthContext";
// import { Screen } from "~/componenets/atoms/Screen";
// import LottieView from "lottie-react-native";
// import Button from "~/componenets/atoms/AnimatedButton";
// import { SPACING } from "~/constants/Spacing";
// import { StatusBar } from "expo-status-bar";

// export default function Home({ navigation }) {
//   const { logout } = useAuth();
//   return (
//     <Screen
//       preset="fixed"
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <StatusBar translucent={true} backgroundColor="transparent" />
//       <View style={styles.button}>
//         <Button
//           onPress={() => {
//             navigation.navigate("Explore");
//           }}
//           titleUntranslated="Explore"
//         />
//         <Button
//           onPress={() => {
//             logout();
//           }}
//           titleUntranslated="Log Out"
//         />
//       </View>
//     </Screen>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     gap: SPACING.SPACING_MD,
//     width: SPACING.SCREEN_WIDTH - 40,
//   },
//   animation: {
//     width: 100,
//     height: 100,
//   },
// });
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { Image } from "expo-image";
import { SPACING } from "~/constants/Spacing";
import { COLORS } from "~/constants/Colors";
import { LocationDiscover } from "iconsax-react-native";
import Button from "~/componenets/atoms/AnimatedButton";
import { useAuth } from "~/context/AuthContext";

export default function Home() {
  const { logout } = useAuth();
  const [mapHeight, setMapHeight] = useState(0.4);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distances, setDistances] = useState([]);
  const [customMarkers] = useState([
    { latitude: 37.7749, longitude: -122.4194, title: "San Francisco" },
    { latitude: 34.0522, longitude: -118.2437, title: "Los Angeles" },
    { latitude: 40.7128, longitude: -74.006, title: "New York" },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      showCurrentLocation(); // Fetch initial location
    })();
  }, []);

  // Haversine formula to calculate distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const showCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const currentLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(currentLoc);

      // Calculate distances to custom markers
      const calculatedDistances = customMarkers.map(
        (marker) =>
          calculateDistance(
            currentLoc.latitude,
            currentLoc.longitude,
            marker.latitude,
            marker.longitude
          ).toFixed(2) // Round to 2 decimal places
      );
      setDistances(calculatedDistances);
    } catch (error) {
      alert("Unable to fetch location. Ensure location services are enabled.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { flex: mapHeight }]}
        provider="google"
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {/* Custom Markers */}
        {customMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          >
            <View style={styles.customMarker}>
              <Image
                source={require("../../../assets/icons/bulk_location.png")}
                tintColor={COLORS.COLOR_PRIMARY}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Callout style={{ width: 150 }} tooltip={true}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                {currentLocation && (
                  <Text style={styles.distanceText}>
                    {distances[index]
                      ? `${distances[index]} km away`
                      : "Calculating..."}
                  </Text>
                )}
              </View>
            </Callout>
          </Marker>
        ))}

        {/* Current Location Marker */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="My Location"
            pinColor="blue"
          >
            <View style={styles.customMarker}>
              <Image
                source={require("../../../assets/icons/bold_location.png")}
                tintColor={COLORS.COLOR_INFO}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </Marker>
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={showCurrentLocation}>
        <LocationDiscover color={COLORS.COLOR_PRIMARY} size={30} />
      </TouchableOpacity>
      <Button
        onPress={() => {
          logout();
        }}
        titleUntranslated="Log Out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: SPACING.SCREEN_HEIGHT,
  },
  button: {
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: COLORS.COLOR_TEXT_PRIMARY,
    bottom: 100,
    right: 24,
  },
  customMarker: {
    alignContent: "center",
    justifyContent: "center",
  },
  calloutContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderColor: "#007BFF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calloutTitle: {
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 5,
    textAlign: "center",
  },
  distanceText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});
