import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { COLORS } from "~/constants/Colors";
import {
  Bucket,
  DirectRight,
  Ghost,
  NotificationBing,
  Reserve,
  Scanner,
  TableDocument,
  Timer,
} from "iconsax-react-native";
import { SPACING } from "~/constants/Spacing";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import MapView, { Callout, Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import FloatingCategories from "~/componenets/Home/FloatingCategories";
import FloatingCards from "~/componenets/Home/FloatingCards";

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const MIDDLE_SNAP_POINT = 300;

  const SNAP_POINTS = [64, MIDDLE_SNAP_POINT, "83%"];
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

  const animatedPOIListIndex = useSharedValue<number>(0);
  const animatedPOIListPosition = useSharedValue<number>(SPACING.SCREEN_HEIGHT);
  const animatedPOIDetailsIndex = useSharedValue<number>(0);
  const animatedPOIDetailsPosition = useSharedValue<number>(
    SPACING.SCREEN_HEIGHT
  );

  const weatherAnimatedIndex = useDerivedValue(() =>
    animatedPOIListIndex.value > animatedPOIDetailsIndex.value
      ? animatedPOIListIndex.value
      : animatedPOIDetailsIndex.value
  );
  const weatherAnimatedPosition = useDerivedValue(() =>
    animatedPOIListPosition.value < animatedPOIDetailsPosition.value
      ? animatedPOIListPosition.value
      : animatedPOIDetailsPosition.value
  );
  useLayoutEffect(() => {
    requestAnimationFrame(() => bottomSheetRef.current?.present());
  }, []);
  return (
    <BottomSheetModalProvider>
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
        {/* <View
          style={{
            overflow: "hidden",
            height: "100%",
            width: "100%",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            borderColor: COLORS.COLOR_BACKGROUND,
          }}
        > */}
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
        {/* </View> */}

        <FloatingCategories
          animatedIndex={weatherAnimatedIndex}
          animatedPosition={weatherAnimatedPosition}
        />
        <FloatingCards
          animatedIndex={animatedPOIListIndex}
          animatedPosition={animatedPOIListPosition}
        />
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={SNAP_POINTS}
          enablePanDownToClose={false}
          onChange={handleSheetChanges}
          key="PoiListSheet"
          name="PoiListSheet"
          index={1}
          enableDismissOnClose={false}
          enableDynamicSizing={false}
          animatedPosition={animatedPOIListPosition}
          animatedIndex={animatedPOIListIndex}
          handleIndicatorStyle={{
            backgroundColor: COLORS.COLOR_BACKGROUND,
          }}
        >
          <BottomSheetView style={{ backgroundColor: COLORS.COLOR_BACKGROUND }}>
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Card
                  isClosed={true}
                  style={{
                    marginRight: index == 4 ? 24 : SPACING.SPACING_MD,
                    marginLeft: index == 0 ? 24 : 0,
                  }}
                  key={index}
                />
              ))}
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export const Card = ({ style, isClosed }) => {
  return (
    <View
      style={[
        {
          // height: 177,
          width: 201,
          backgroundColor: COLORS.COLOR_SURFACE,
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: COLORS.COLOR_BORDER,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 201,
          height: 20,
          backgroundColor: isClosed
            ? COLORS.COLOR_BORDER
            : COLORS.COLOR_PRIMARY_LIGHT,
          overflow: "hidden",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        {!isClosed ? (
          <Image
            source={require("../../../assets/images/cardHeaderStyle.png")}
            style={{ width: 124, height: 20 }}
          />
        ) : (
          <TextComponent
            preset="caption"
            untranslatedText="Closed"
            color="COLOR_TEXT_SECONDARY"
            style={{
              alignSelf: "center",
              marginTop: SPACING.SPACING_XS - 2,
            }}
          />
        )}
      </View>
      <View style={{ padding: 10, rowGap: 5 }}>
        <TextComponent
          untranslatedText="LongHorn Stackhouse"
          preset="body"
          weight="medium"
        />
        <TextComponent
          untranslatedText="2640 Tarna Drive, Dallas, TX 75229  TX 75229  TX 75229"
          preset="caption"
          color="COLOR_TEXT_SECONDARY"
        />
        <View
          style={{
            gap: 5,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <CardDetails
            icon={
              <DirectRight
                size={16}
                color={
                  isClosed ? COLORS.COLOR_TEXT_SECONDARY : COLORS.COLOR_PRIMARY
                }
                variant="Bulk"
              />
            }
            name="1.2 Mile"
          />
          <CardDetails
            icon={
              <Timer
                size={16}
                color={
                  isClosed ? COLORS.COLOR_TEXT_SECONDARY : COLORS.COLOR_PRIMARY
                }
                variant="Bulk"
              />
            }
            name="Reservation"
          />
          <CardDetails
            icon={
              <TableDocument
                size={16}
                color={
                  isClosed ? COLORS.COLOR_TEXT_SECONDARY : COLORS.COLOR_PRIMARY
                }
                variant="Bulk"
              />
            }
            name="124 Tables"
          />
          <CardDetails
            icon={
              <Ghost
                size={16}
                color={
                  isClosed ? COLORS.COLOR_TEXT_SECONDARY : COLORS.COLOR_PRIMARY
                }
                variant="Bulk"
              />
            }
            name="Cafes           "
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 8,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              columnGap: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isClosed
                ? COLORS.COLOR_TEXT_SECONDARY
                : COLORS.COLOR_PRIMARY,
              width: 83,
              height: 20,
              borderRadius: 6,
            }}
          >
            <Reserve
              size={14}
              color={COLORS.COLOR_TEXT_INVERSE}
              variant="Bulk"
            />
            <TextComponent
              preset="overline"
              color="COLOR_TEXT_INVERSE"
              untranslatedText="Reservation"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              columnGap: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isClosed
                ? COLORS.COLOR_TEXT_SECONDARY
                : COLORS.COLOR_PRIMARY,
              width: 83,
              height: 20,
              borderRadius: 6,
            }}
          >
            <Bucket
              size={14}
              color={COLORS.COLOR_TEXT_INVERSE}
              variant="Bulk"
            />
            <TextComponent
              preset="overline"
              weight="medium"
              color="COLOR_TEXT_INVERSE"
              untranslatedText="Order Online"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const CardDetails = ({ icon, name }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          columnGap: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
        <TextComponent preset="caption" weight="bold" untranslatedText={name} />
      </View>
    </>
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
    ...StyleSheet.absoluteFillObject,
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
