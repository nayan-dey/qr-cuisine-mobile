import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { SPACING } from "~/constants/Spacing";
import { Image } from "expo-image";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import { COLORS } from "~/constants/Colors";

import { useRef } from "react";
import { Animated, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Pagination from "~/componenets/onBoardingComponenets/Pagination";

const { width } = Dimensions.get("window");
const screens = [
  {
    title: (
      <TextComponent
        untranslatedText="Discover The "
        preset="title"
        weight="bold"
      >
        <TextComponent
          untranslatedText="Best"
          preset="title"
          weight="bold"
          style={{ color: COLORS.COLOR_SECONDARY }}
        />
      </TextComponent>
    ),
    subtitle: (
      <TextComponent
        untranslatedText="Restaurant "
        preset="title"
        weight="bold"
        style={{ color: COLORS.COLOR_SECONDARY }}
      >
        <TextComponent
          untranslatedText="Around You"
          preset="title"
          weight="bold"
        />
      </TextComponent>
    ),
    description: "Uncover delightful dining experiences and",
    desription2: "exclusive deals tailored for your perfect meal.",
    imageSource: require("../../../assets/images/onboardingScreenShotOne.png"),
  },
  {
    title: (
      <TextComponent
        untranslatedText="Reserve "
        preset="title"
        weight="bold"
        style={{ color: COLORS.COLOR_SECONDARY }}
      >
        <TextComponent
          untranslatedText="Your Tables"
          preset="title"
          weight="bold"
        />
      </TextComponent>
    ),
    subtitle: (
      <TextComponent untranslatedText="With " preset="title" weight="bold">
        <TextComponent
          untranslatedText="Just A Tap"
          preset="title"
          weight="bold"
          style={{ color: COLORS.COLOR_SECONDARY }}
        />
      </TextComponent>
    ),
    description: "Instantly book tables and avoid long wait",
    desription2: "times at restaurant",
    imageSource: require("../../../assets/images/onboardingScreenShotTwo.png"),
  },
  {
    title: (
      <TextComponent untranslatedText="Order " preset="title" weight="bold">
        <TextComponent
          untranslatedText="Food And"
          preset="title"
          weight="bold"
          style={{ color: COLORS.COLOR_SECONDARY }}
        />
      </TextComponent>
    ),
    subtitle: (
      <TextComponent
        untranslatedText="Pay "
        preset="title"
        weight="bold"
        style={{ color: COLORS.COLOR_SECONDARY }}
      >
        <TextComponent
          untranslatedText="Directly In-App"
          preset="title"
          weight="bold"
        />
      </TextComponent>
    ),
    description: "Place orders, track progress, and pay securely",
    desription2: "with flexible payment options.",
    imageSource: require("../../../assets/images/onboardingScreenShotThree.png"),
  },
];

const ScreenOne = ({
  title,
  subtitle,
  description,
  desription2,
  imageSource,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.halfCircle}>
        <View style={styles.profileImageContainer}>
          <Image
            source={imageSource}
            style={styles.profileImage}
            // placeholder={{ blurhash }}
            // transition={500}
            contentFit="contain"
          />
        </View>
      </View>
      <View style={styles.content}>
        {title}
        {subtitle}
        <TextComponent
          untranslatedText={description}
          preset="body"
          style={{ paddingTop: 20 }}
          color="COLOR_TEXT_SECONDARY"
        />
        <TextComponent
          untranslatedText={desription2}
          preset="body"
          color="COLOR_TEXT_SECONDARY"
        />
      </View>
    </View>
  );
};

export default function OnBoardingScreen({ navigation }) {
  const { bottom, top } = useSafeAreaInsets();
  const scrollValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = scrollValue.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [0, 13, 26],
  });

  const scrollToPage = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    }
  };

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollToPage(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToPage(currentIndex - 1);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(pageIndex);
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.COLOR_SURFACE} style="dark" />

      <TextComponent
        untranslatedText="Skip"
        preset="body"
        weight="medium"
        style={{
          color: COLORS.COLOR_PRIMARY,
          position: "absolute",
          top: SPACING.SPACING_MD + top,
          right: SPACING.SPACING_LG,
          zIndex: 10,
        }}
        onPress={() => {
          navigation.replace("AuthNavigator", {
            screen: "Welcome",
          });
          AsyncStorage.setItem("@onboardingCompleted", "true");
        }}
      />
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={handleScroll}
        ref={scrollViewRef}
      >
        {screens.map((screenData, index) => (
          <View style={styles.card} key={index}>
            <ScreenOne {...screenData} />
          </View>
        ))}
      </ScrollView>
      <Pagination
        {...{
          navigation,
          screens,
          currentIndex,
          handlePrevious,
          translateX,
          handleNext,
        }}
      />
      <View style={styles.indicatorContainer} pointerEvents="none">
        {screens.map((_, index) => (
          <Indicator key={index} />
        ))}
        <Animated.View
          style={[
            styles.activeIndicator,
            { position: "absolute", bottom: -1, transform: [{ translateX }] },
          ]}
        />
      </View>
    </View>
  );
}

function Indicator() {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.COLOR_BACKGROUND,
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.SPACING_LG,
    alignItems: "center",
    flex: 0.3,
    paddingTop: SPACING.SPACING_2XL,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  halfCircle: {
    width: width * 2,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    backgroundColor: COLORS.COLOR_SURFACE,
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9,
    overflow: "hidden",
    // elevation: 7,
  },
  profileImage: {
    height: SPACING.SCREEN_HEIGHT * 0.65,
    width: SPACING.SCREEN_WIDTH,
  },
  profileImageContainer: {
    top: 100,
  },
  card: {
    width,
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  indicatorContainer: {
    alignSelf: "center",
    bottom: 50,
    flexDirection: "row",
  },
  indicator: {
    height: 7,
    width: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.COLOR_PRIMARY_LIGHT,
    marginHorizontal: 3,
  },
  activeIndicator: {
    height: 9,
    width: 9,
    borderRadius: 4.5,
    backgroundColor: COLORS.COLOR_PRIMARY,
    marginHorizontal: 3,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.SPACING_LG,
    paddingVertical: 20,
    backgroundColor: COLORS.COLOR_BACKGROUND,
  },
  paginaionButton: {
    backgroundColor: COLORS.COLOR_PRIMARY,
    height: 56,
    width: 56,
    borderRadius: SPACING.SPACING_RADIUS,
    alignItems: "center",
    justifyContent: "center",
  },
  paginaionButtonPrevious: {
    backgroundColor: COLORS.COLOR_BACKGROUND,
    height: 56,
    width: 56,
    borderRadius: SPACING.SPACING_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth + 1,
    borderColor: COLORS.COLOR_PRIMARY,
  },
});
