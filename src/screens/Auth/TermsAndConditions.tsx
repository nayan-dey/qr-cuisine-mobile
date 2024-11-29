import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "~/constants/Colors";
import { SPACING } from "~/constants/Spacing";
import { FONT_SIZE } from "~/constants/FontSize";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ArrowLeft } from "iconsax-react-native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import { TYPOGRAPHY } from "~/constants/Typography";
import { Screen } from "~/componenets/atoms/Screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsAndConditions({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <Screen preset="scroll" style={styles.container}>
        <StatusBar backgroundColor={COLORS.COLOR_BACKGROUND} style="dark" />
        <TextComponent
          style={{ color: COLORS.COLOR_PRIMARY, paddingBottom: 8 }}
          untranslatedText="Cancelation Policy"
          preset="body"
          weight="semiBold"
        />
        <TextComponent
          color="COLOR_TEXT_SECONDARY"
          preset="smallText"
          style={{ lineHeight: 20 }}
          untranslatedText="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi"
        />
        <TextComponent
          style={{
            color: COLORS.COLOR_PRIMARY,
            paddingBottom: 8,
            paddingTop: 16,
          }}
          untranslatedText="Terms & Condition"
          preset="body"
          weight="semiBold"
        />
        <TextComponent
          color="COLOR_TEXT_SECONDARY"
          preset="smallText"
          style={{ lineHeight: 20, paddingBottom: 20 }}
          untranslatedText="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi"
        />
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
    backgroundColor: COLORS.COLOR_BACKGROUND,
    paddingHorizontal: SPACING.SPACING_LG,
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
            onPress={() => navigation.goBack()}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.topContainer}
          >
            <ArrowLeft size={18} color={COLORS.COLOR_TEXT_MUTED} />
          </Pressable>
        </Animated.View>
        <TextComponent
          untranslatedText="Privacy Policy"
          preset="subtitle"
          weight="medium"
        />
        <View style={{ flex: 1 }} />
      </View>
    </>
  );
};
