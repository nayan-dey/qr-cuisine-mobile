import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "~/constants/Colors";
import { SPACING } from "~/constants/Spacing";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  ArrowLeft,
  SearchNormal1,
  CloseSquare,
  LocationDiscover,
  DirectRight,
} from "iconsax-react-native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import { FONT_SIZE } from "~/constants/FontSize";
import { TYPOGRAPHY } from "~/constants/Typography";
import { Screen } from "~/componenets/atoms/Screen";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebounce } from "~/hooks/useDebounce";
import { useLocationSuggestions } from "~/hooks/useManualLocation";
import { Image } from "expo-image";

export default function ManualLocation({ navigation }) {
  const placeholderColor = COLORS.COLOR_TEXT_PLACEHOLDER;
  const [inputText, setInputText] = useState("");

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const { status: notificationStatus } =
        await Notifications.getPermissionsAsync();
      if (status === "granted") {
        await AsyncStorage.setItem("locationGranted", "true");
        if (notificationStatus === "granted") {
          navigation.replace("DashboardTabs");
        } else {
          navigation.replace("NotificationPermission");
        }
      } else if (status === "denied") {
        Alert.alert(
          "Permission Denied",
          "We need location access to proceed. Please enable it in your device settings."
        );
      } else {
        await AsyncStorage.setItem("locationGranted", "false");
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };
  const debouncedSearchTerm = useDebounce(inputText, 1000);
  const { suggestions, setSuggestions, loading, errorState, setErrorState } =
    useLocationSuggestions(debouncedSearchTerm);
  // Clear input text
  const handleClearInput = () => {
    setInputText("");
    setSuggestions(null);
    setErrorState(null);
  };

  const locationPress = async (item) => {
    const jsonValue = JSON.stringify(item);
    AsyncStorage.setItem("@manual_location_data", jsonValue);
    const { status: notificationStatus } =
      await Notifications.getPermissionsAsync();
    await AsyncStorage.setItem("locationGranted", "true");
    if (notificationStatus === "granted") {
      navigation.replace("DashboardTabs");
    } else {
      navigation.replace("NotificationPermission");
    }
  };
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const backAction = () => {
      // If you want to go back to the previous screen on back press
      navigation.navigate("LocationPermission");
      return true; // This prevents the default back press behavior
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    // Clean up the event listener on component unmount
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Screen preset="scroll" style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.inputContainer}>
          <SearchNormal1
            size={24}
            color={COLORS.COLOR_TEXT_MUTED}
            style={{ marginRight: SPACING.SPACING_SM }}
          />
          <TextInput
            value={inputText}
            onChangeText={(text) => {
              setInputText(text);
              if (text === "") {
                setErrorState(null);
                setSuggestions([]); // Clear suggestions if the input text is empty
              }
            }}
            autoFocus={true}
            placeholder={"Enter Your Location"}
            style={[styles.input]}
            placeholderTextColor={placeholderColor}
          />
          {inputText.length > 0 && (
            <Pressable
              onPress={handleClearInput}
              style={{ marginLeft: SPACING.SPACING_SM }}
            >
              <CloseSquare size={24} color={COLORS.COLOR_PRIMARY} />
            </Pressable>
          )}
        </View>
        <View style={styles.subtitleContainer}>
          <LocationDiscover
            size={24}
            color={COLORS.COLOR_PRIMARY}
            variant="Bulk"
            style={{ marginRight: SPACING.SPACING_SM }}
          />
          <TextComponent
            preset="body"
            untranslatedText="Use my current location"
            onPress={requestLocationPermission}
          />
        </View>
        {inputText.length > 3 && (
          <>
            <View
              style={{
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: COLORS.COLOR_BORDER,
                width: "100%",
                height: 1,
                marginVertical: SPACING.SPACING_MD,
              }}
            />
            <TextComponent
              preset="body"
              untranslatedText="Search Results"
              color="COLOR_TEXT_SECONDARY"
              style={{ marginBottom: SPACING.SPACING_MD }}
            />
          </>
        )}

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.COLOR_PRIMARY} />
        ) : (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <>
                {inputText.length > 3 && (
                  <Pressable
                    onPress={() => locationPress(item)}
                    style={[
                      styles.subtitleContainer,
                      {
                        opacity,
                      },
                    ]}
                    onPressIn={() => setOpacity(0.8)}
                    onPressOut={() => setOpacity(1)}
                  >
                    <DirectRight
                      size={24}
                      color={COLORS.COLOR_PRIMARY}
                      variant="Bulk"
                      style={{ marginRight: SPACING.SPACING_SM }}
                    />
                    <View>
                      <View style={{ maxWidth: SPACING.SCREEN_WIDTH - 80 }}>
                        <TextComponent
                          preset="body"
                          untranslatedText={
                            item?.structured_formatting?.main_text
                          }
                          weight="regular"
                          numberOfLines={1}
                        />
                        <TextComponent
                          untranslatedText={
                            item?.structured_formatting?.secondary_text
                          }
                          preset="smallText"
                          color="COLOR_TEXT_SECONDARY"
                          style={{ marginVertical: SPACING.SPACING_XS }}
                          numberOfLines={1}
                        />
                      </View>
                    </View>
                  </Pressable>
                )}
              </>
            )}
          />
        )}
        {errorState && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: SPACING.SPACING_3XL,
            }}
          >
            <Image
              source={require("../../../assets/images/sad_ghost.svg")}
              style={{
                width: SPACING.SCREEN_WIDTH * 0.2,
                height: SPACING.SCREEN_WIDTH * 0.2,
                marginBottom: SPACING.SPACING_MD,
              }}
              contentFit="contain"
            />
            <TextComponent
              preset="body"
              untranslatedText={errorState}
              style={{ alignSelf: "center" }}
              color="COLOR_TEXT_SECONDARY"
            />
          </View>
        )}
      </Screen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.COLOR_BACKGROUND,
    paddingHorizontal: SPACING.SPACING_LG,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingVertical: SPACING.SPACING_LG,
  },
  topContainer: {
    height: 36,
    width: 36,
    borderWidth: StyleSheet.hairlineWidth + 1,
    borderColor: COLORS.COLOR_BORDER,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: SPACING.SPACING_3XL,
    borderRadius: 12,
    backgroundColor: COLORS.COLOR_SURFACE,
    width: "100%",
    paddingHorizontal: SPACING.SPACING_MD,
    marginBottom: SPACING.SPACING_LG,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.FONT_BODY,
    fontFamily: TYPOGRAPHY.PRIMARY.REGULAR,
    color: COLORS.COLOR_TEXT_PRIMARY,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: SPACING.SPACING_XS,
  },
});

const Header = ({ navigation }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const onPressIn = () => {
    scale.value = withTiming(0.98, { duration: 50 });
    opacity.value = withTiming(0.8, { duration: 50 });
  };

  const onPressOut = () => {
    scale.value = withTiming(1, { duration: 50 });
    opacity.value = withTiming(1, { duration: 50 });
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <Animated.View style={[animatedStyle, { flex: 1 }]}>
          <Pressable
            onPress={() => navigation.replace("LocationPermission")}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.topContainer}
          >
            <ArrowLeft size={18} color={COLORS.COLOR_TEXT_MUTED} />
          </Pressable>
        </Animated.View>
        <TextComponent
          untranslatedText="Enter Your Location"
          preset="subtitle"
          weight="medium"
        />
        <View style={{ flex: 1 }} />
      </View>
    </>
  );
};
