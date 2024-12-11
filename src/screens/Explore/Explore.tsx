// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { TextComponent } from "~/componenets/atoms/TextComponent";

// export default function Explore() {
//   return (
//     <View style={styles.container}>
//       <TextComponent
//         preset="title"
//         untranslatedText="Explore"
//         style={{ paddingBottom: 8 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// import React, { useEffect, useRef, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import MapView, { Callout, Marker } from "react-native-maps";
// import ActionSheet from "react-native-actions-sheet";
// import { COLORS } from "~/constants/Colors";
// import { Image } from "expo-image";
// import { SPACING } from "~/constants/Spacing";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { Coffee, NotificationBing, Scanner } from "iconsax-react-native";
// import { TextComponent } from "~/componenets/atoms/TextComponent";
// import * as Location from "expo-location";
// import * as Notifications from "expo-notifications";

// const App = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [distances, setDistances] = useState([]);
//   const [locationName, setLocationName] = useState("Fetching location...");
//   const [customMarkers] = useState([
//     { latitude: 37.7749, longitude: -122.4194, title: "San Francisco" },
//     { latitude: 34.0522, longitude: -118.2437, title: "Los Angeles" },
//     { latitude: 40.7128, longitude: -74.006, title: "New York" },
//   ]);
//   const [initialRegion, setInitialRegion] = useState(null);
//   const [notifications, setNotifications] = useState(null);
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         alert("Permission to access location was denied");
//         return;
//       }
//       showCurrentLocation();
//     })();
//   }, []);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = (value) => (value * Math.PI) / 180;
//     const R = 6371; // Radius of Earth in kilometers
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) *
//         Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in kilometers
//   };

//   const showCurrentLocation = async () => {
//     const { status: notificationStatus } =
//       await Notifications.getPermissionsAsync();
//     setNotifications(notificationStatus);
//     try {
//       let location = await Location.getCurrentPositionAsync({});
//       const currentLoc = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       };
//       setCurrentLocation(currentLoc);
//       setInitialRegion({
//         ...currentLoc,
//         latitudeDelta: 0.1,
//         longitudeDelta: 0.1,
//       });
//       const reverseGeocode = await Location.reverseGeocodeAsync({
//         latitude: currentLoc.latitude,
//         longitude: currentLoc.longitude,
//       });

//       if (reverseGeocode.length > 0) {
//         const { city, region, country } = reverseGeocode[0];
//         setLocationName(`${city || region}, ${country}`);
//       } else {
//         setLocationName("Unknown location");
//       }
//       // Calculate distances to custom markers
//       const calculatedDistances = customMarkers.map(
//         (marker) =>
//           calculateDistance(
//             currentLoc.latitude,
//             currentLoc.longitude,
//             marker.latitude,
//             marker.longitude
//           ).toFixed(2) // Round to 2 decimal places
//       );
//       setDistances(calculatedDistances);
//     } catch (error) {
//       alert("Unable to fetch location. Ensure location services are enabled.");
//     }
//   };

//   const actionSheetRef = useRef();

//   useEffect(() => {
//     actionSheetRef.current?.show(); // Ensure it snaps to the initial position
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar backgroundColor={COLORS.COLOR_BACKGROUND} style={"dark"} />
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Image
//             source={require("../../../assets/images/main_logo_with_title.png")}
//             style={{ height: 44, width: 110 }}
//             contentFit="contain"
//           />
//           <View style={styles.rightSideItemsContainer}>
//             <View
//               style={{
//                 height: 44,
//                 width: 44,
//                 borderRadius: 16,
//                 backgroundColor: COLORS.COLOR_SURFACE,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <NotificationBing color={COLORS.COLOR_TEXT_SECONDARY} size="24" />
//             </View>
//             <View
//               style={{
//                 borderRadius: 16,
//                 backgroundColor: "#4CAF5040",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 flexDirection: "row",
//                 padding: SPACING.SPACING_SM,
//                 paddingVertical: SPACING.SPACING_SM + 4,
//                 marginLeft: SPACING.SPACING_XXS,
//               }}
//             >
//               <Scanner
//                 color={COLORS.COLOR_PRIMARY}
//                 size="24"
//                 variant="Bulk"
//                 style={{ marginRight: SPACING.SPACING_XS }}
//               />
//               <TextComponent
//                 preset="body"
//                 untranslatedText="Scan Table"
//                 style={{ color: COLORS.COLOR_PRIMARY }}
//                 weight="medium"
//               />
//             </View>
//           </View>
//         </View>

//         <MapView style={[styles.map]} provider="google" region={initialRegion}>
//           {/* Custom Markers */}
//           {customMarkers.map((marker, index) => (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: marker.latitude,
//                 longitude: marker.longitude,
//               }}
//               title={marker.title}
//             >
//               <View style={styles.customMarker}>
//                 <Image
//                   source={require("../../../assets/icons/bulk_location.png")}
//                   tintColor={COLORS.COLOR_PRIMARY}
//                   style={{ width: 30, height: 30 }}
//                 />
//               </View>
//               <Callout style={{ width: 150 }} tooltip={true}>
//                 <View style={styles.calloutContainer}>
//                   <Text style={styles.calloutTitle}>{marker.title}</Text>
//                   {currentLocation && (
//                     <Text style={styles.distanceText}>
//                       {distances[index]
//                         ? `${distances[index]} km away`
//                         : "Calculating..."}
//                     </Text>
//                   )}
//                 </View>
//               </Callout>
//             </Marker>
//           ))}

//           {/* Current Location Marker */}
//           {currentLocation && (
//             <Marker
//               coordinate={{
//                 latitude: currentLocation.latitude,
//                 longitude: currentLocation.longitude,
//               }}
//               title="My Location"
//               pinColor="blue"
//             >
//               <View style={styles.customMarker}>
//                 <Image
//                   source={require("../../../assets/icons/bold_location.png")}
//                   tintColor={COLORS.COLOR_INFO}
//                   style={{ width: 30, height: 30 }}
//                 />
//               </View>
//             </Marker>
//           )}
//         </MapView>
//         <View style={styles.categoryContainer}>
//           {["Coffee", "Tea", "Sandwich", "Burger", "Pizza"].map(
//             (category, index) => (
//               <View style={styles.categoryItem}>
//                 <Coffee color={COLORS.COLOR_PRIMARY} size={16} />
//                 <TextComponent
//                   preset="smallText"
//                   untranslatedText="Coffee"
//                   style={{ color: COLORS.COLOR_PRIMARY }}
//                 />
//               </View>
//             )
//           )}
//         </View>
//         <ActionSheet
//           ref={actionSheetRef}
//           isModal={false}
//           gestureEnabled={true}
//           animated={true}
//           snapPoints={[10, 60, 100]}
//           initialSnapIndex={1} // Start at 30% height
//           closable={false} // Prevent closing
//           backgroundInteractionEnabled={true}
//           containerStyle={{
//             backgroundColor: COLORS.COLOR_BACKGROUND,
//             borderTopRightRadius: 24,
//             borderTopLeftRadius: 24,
//           }}
//           indicatorStyle={{
//             width: 48,
//             height: 4,
//             backgroundColor: COLORS.COLOR_BORDER,
//             borderRadius: 3,
//           }}
//         >
// <View style={styles.bottomSheetHeader}>
//   <View style={{ flexDirection: "row", alignItems: "center" }}>
//     <TextComponent
//       preset="title"
//       untranslatedText="Nearby QRCuisines"
//       color="COLOR_TEXT_PRIMARY"
//     />
//     <View
//       style={{
//         backgroundColor: "#4CAF5033",
//         padding: 1,
//         paddingHorizontal: 5,
//         borderRadius: 8,
//         marginLeft: 10,
//       }}
//     >
//       <TextComponent
//         preset="smallText"
//         untranslatedText="Live"
//         style={{ color: COLORS.COLOR_PRIMARY }}
//       />
//     </View>
//   </View>
//   <TextComponent preset="smallText" untranslatedText="See All" />
// </View>
//           <View
//             style={{
//               flexDirection: "row",
//               gap: 10,
//               minHeight: SPACING.SCREEN_HEIGHT - 250,
//             }}
//           >
//             <Card />
//             <Card />
//           </View>
//           {/* <View style={styles.cardItem} /> */}
//         </ActionSheet>
//       </View>
//     </SafeAreaView>
//   );
// };

// const Card = () => {
//   return (
//     <View style={styles.cardContainer}>
//       {/* Header Section */}
//       <View style={styles.header2}>
//         <View style={styles.yellowStrip}></View>
//         <View style={styles.greenStrip}></View>
//       </View>

//       {/* Content Section */}
//       <View style={styles.content}>
//         <Text style={styles.title}>Lonhorn Steakhouse</Text>
//         <Text style={styles.address}>2640 Tarna Drive, Dallas, TX 75229</Text>
// animatedIndex;
//         {/* Info Section */}
//         <View style={styles.infoRow}>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoText}>🥩 1.2 Miles</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoText}>🍴 122 Tables</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoText}>⏳ 87 Vacant</Text>
//           </View>
//         </View>

//         {/* Buttons Section */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Reservation</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Order Online</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     width: "100%",
//     paddingHorizontal: SPACING.SPACING_LG,
//     zIndex: 2,
//     backgroundColor: COLORS.COLOR_BACKGROUND,
//     paddingVertical: SPACING.SPACING_MD,
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
//   map: {
//     width: "100%",
//     height: SPACING.SCREEN_HEIGHT,
//   },
//   rightSideItemsContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   cardItem: {
//     marginTop: 8,
//     padding: 12,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//     minHeight: 320,
//   },
//   customMarker: {
//     alignContent: "center",
//     justifyContent: "center",
//   },
//   calloutContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 10,
//     borderColor: "#007BFF",
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   calloutTitle: {
//     fontWeight: "bold",
//     color: "#007BFF",
//     marginBottom: 5,
//     textAlign: "center",
//   },
//   distanceText: {
//     fontSize: 14,
//     color: "gray",
//     marginTop: 5,
//   },

//   locationText: {
//     fontSize: 16,
//     color: COLORS.COLOR_PRIMARY,
//   },
//   categoryContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     position: "absolute",
//     top: SPACING.SCREEN_HEIGHT / 3 - 10,
//     alignSelf: "center",
//     width: "100%",
//     paddingHorizontal: SPACING.SPACING_LG,
//     zIndex: 2,
//   },
//   categoryItem: {
//     backgroundColor: COLORS.COLOR_SURFACE,
//     borderRadius: SPACING.SPACING_RADIUS,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     width: 63,
//   },
//   cardContainer: {
//     width: 201,
//     height: 177,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     elevation: 5,
//     overflow: "hidden",
//   },
//   header2: {
//     flexDirection: "row",
//     height: 20,
//   },
//   yellowStrip: {
//     flex: 1,
//     backgroundColor: "#FFD700",
//   },
//   greenStrip: {
//     flex: 1,
//     backgroundColor: "#90EE90",
//   },
//   content: {
//     padding: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   address: {
//     fontSize: 12,
//     color: "#555",
//     marginVertical: 5,
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 5,
//   },
//   infoItem: {
//     alignItems: "center",
//   },
//   infoText: {
//     fontSize: 12,
//     color: "#000",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 5,
//     backgroundColor: "#32CD32",
//     padding: 5,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 12,
//     color: "#fff",
//   },
//   bottomSheetHeader: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: SPACING.SPACING_LG,
//     paddingBottom: SPACING.SPACING_MD,
//   },
// });

// export default App;
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { COLORS } from "~/constants/Colors";
import { Coffee, NotificationBing, Scanner } from "iconsax-react-native";
import { SPACING } from "~/constants/Spacing";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import MapView, { Callout, Marker } from "react-native-maps";

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "83%"], []);
  const [snapIndex, setSnapIndex] = useState(0);
  const handleSheetChanges = useCallback((index) => {
    setSnapIndex(index);
  }, []);

  const animatedIndex = bottomSheetRef.current?.animatedIndex;
  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedIndex?.value || 0,
      [0, 1, 2],
      ["red", "green", "blue"]
    );
    return { backgroundColor };
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [distances, setDistances] = useState([]);
  const [locationName, setLocationName] = useState("Fetching location...");
  const [customMarkers] = useState([
    { latitude: 37.7749, longitude: -122.4194, title: "San Francisco" },
    { latitude: 34.0522, longitude: -118.2437, title: "Los Angeles" },
    { latitude: 40.7128, longitude: -74.006, title: "New York" },
  ]);
  const [initialRegion, setInitialRegion] = useState(null);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      showCurrentLocation();
    })();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const showCurrentLocation = async () => {
    const { status: notificationStatus } =
      await Notifications.getPermissionsAsync();
    setNotifications(notificationStatus);
    try {
      let location = await Location.getCurrentPositionAsync({});
      const currentLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(currentLoc);
      setInitialRegion({
        ...currentLoc,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLoc.latitude,
        longitude: currentLoc.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { city, region, country } = reverseGeocode[0];
        setLocationName(`${city || region}, ${country}`);
      } else {
        setLocationName("Unknown location");
      }

      const calculatedDistances = customMarkers.map((marker) =>
        calculateDistance(
          currentLoc.latitude,
          currentLoc.longitude,
          marker.latitude,
          marker.longitude
        ).toFixed(2)
      );
      setDistances(calculatedDistances);
    } catch (error) {
      alert("Unable to fetch location. Ensure location services are enabled.");
    }
  };
  const fadeOpacity = useSharedValue(0);

  useEffect(() => {
    if (snapIndex !== 2) {
      fadeOpacity.value = withTiming(1, { duration: 300 });
    } else {
      fadeOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [snapIndex]);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOpacity.value,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.COLOR_BACKGROUND} style={"dark"} />
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/main_logo_with_title.png")}
          style={{ height: 44, width: 110 }}
          contentFit="contain"
        />
        <View style={styles.rightSideItemsContainer}>
          <View style={styles.notificationIcon}>
            <NotificationBing color={COLORS.COLOR_TEXT_SECONDARY} size="24" />
          </View>
          <View style={styles.scanContainer}>
            <Scanner
              color={COLORS.COLOR_PRIMARY}
              size="24"
              variant="Bulk"
              style={{ marginRight: SPACING.SPACING_XS }}
            />
            <TextComponent
              preset="body"
              untranslatedText="Scan Table"
              style={{ color: COLORS.COLOR_PRIMARY }}
              weight="medium"
            />
          </View>
        </View>
      </View>

      <MapView style={styles.map} provider="google" region={initialRegion}>
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

        {currentLocation && (
          <Marker
            coordinate={currentLocation}
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
      <Animated.View style={[styles.categoryContainer, fadeStyle]}>
        {snapIndex !== 2 &&
          ["Coffee", "Tea", "Sandwich", "Burger", "Pizza"].map(
            (category, index) => (
              <View key={index} style={styles.categoryItem}>
                <Coffee color={COLORS.COLOR_PRIMARY} size={16} />
                <TextComponent
                  preset="smallText"
                  untranslatedText={category}
                  style={{ color: COLORS.COLOR_PRIMARY }}
                />
              </View>
            )
          )}
      </Animated.View>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
        // onAnimate={(fromIndex, toIndex) => {
        //   if (fromIndex === 0 && toIndex < 0) {
        //     bottomSheetRef.current?.snapTo(0);
        //   }
        // }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.bottomSheetHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextComponent
                preset="title"
                untranslatedText="Nearby QRCuisines"
                color="COLOR_TEXT_PRIMARY"
              />
              <View
                style={{
                  backgroundColor: "#4CAF5033",
                  padding: 1,
                  paddingHorizontal: 5,
                  borderRadius: 8,
                  marginLeft: 10,
                }}
              >
                <TextComponent
                  preset="smallText"
                  untranslatedText="Live"
                  style={{ color: COLORS.COLOR_PRIMARY }}
                />
              </View>
            </View>
            <TextComponent preset="smallText" untranslatedText="See All" />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: SPACING.SPACING_LG,
    zIndex: 2,
    backgroundColor: COLORS.COLOR_BACKGROUND,
    paddingVertical: SPACING.SPACING_MD,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  map: {
    width: "100%",
    height: SPACING.SCREEN_HEIGHT,
  },
  rightSideItemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    height: 44,
    width: 44,
    borderRadius: 16,
    backgroundColor: COLORS.COLOR_SURFACE,
    alignItems: "center",
    justifyContent: "center",
  },
  scanContainer: {
    borderRadius: 16,
    backgroundColor: "#4CAF5040",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: SPACING.SPACING_SM,
    paddingVertical: SPACING.SPACING_SM + 4,
    marginLeft: SPACING.SPACING_XXS,
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
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SPACING.SCREEN_HEIGHT / 3 - 10,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: SPACING.SPACING_LG,
    zIndex: 2,
  },
  categoryItem: {
    backgroundColor: COLORS.COLOR_SURFACE,
    borderRadius: SPACING.SPACING_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 63,
  },
  bottomSheetHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.SPACING_LG,
    paddingBottom: SPACING.SPACING_MD,
  },
});

export default App;
