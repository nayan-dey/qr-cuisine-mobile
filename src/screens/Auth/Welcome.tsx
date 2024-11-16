import { StyleSheet, View } from "react-native";
import React from "react";
import { SPACING } from "~/constants/Spacing";
import { COLORS } from "~/constants/Colors";
import { Image } from "expo-image";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Button from "~/componenets/atoms/AnimatedButton";
import { FONT_SIZE } from "~/constants/FontSize";
import { StatusBar } from "expo-status-bar";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" style="dark" />
      <View style={styles.topContainer}>
        <Image
          source={require("../../../assets/images/finalOnboardingImage.png")}
          style={styles.image}
          contentFit="cover"
        />
      </View>
      <View style={styles.bottomContainer}>
        <TextComponent
          untranslatedText="Earn Exciting "
          preset="title"
          weight="bold"
        >
          <TextComponent
            untranslatedText="Rewards"
            preset="title"
            weight="bold"
            style={{ color: COLORS.COLOR_SECONDARY }}
          />
        </TextComponent>
        <TextComponent
          untranslatedText="And Loyalty "
          preset="title"
          weight="bold"
          style={{ color: COLORS.COLOR_SECONDARY }}
        >
          <TextComponent
            untranslatedText="Points"
            preset="title"
            weight="bold"
          />
        </TextComponent>
        <TextComponent
          untranslatedText="Collect points with every visit and redeem"
          preset="body"
          color="COLOR_TEXT_SECONDARY"
          style={{ paddingTop: SPACING.SPACING_LG }}
        />
        <TextComponent
          untranslatedText="them for special rewards"
          preset="body"
          color="COLOR_TEXT_SECONDARY"
        />
        <Button
          containerStyle={{
            width: "100%",
            paddingTop: SPACING.SPACING_LG,
            // borderRadius: SPACING.SPACING_SM + 4,
          }}
          textStyle={{
            fontSize: FONT_SIZE.FONT_BUTTON,
          }}
          titleUntranslated="Let’s Get Started"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
        <View style={styles.termsAndConditionsTextContainer}>
          <TextComponent
            text="signUp.already_have_an_account"
            preset="body"
            weight="medium"
            color="COLOR_TEXT_SECONDARY"
          />
          <TextComponent
            text="signUp.sign_in"
            preset="body"
            style={styles.underlined}
            weight="medium"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.COLOR_BACKGROUND,
  },
  topContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.COLOR_BACKGROUND,
    zIndex: 2,
  },
  image: {
    width: "100%",
    height: "120%",
  },
  bottomContainer: {
    zIndex: 1,
    flex: 0.4,
    alignItems: "center",
    paddingTop: SPACING.SPACING_3XL,
    backgroundColor: COLORS.COLOR_BACKGROUND,
    paddingHorizontal: SPACING.SPACING_LG,
  },
  underlined: {
    textDecorationLine: "underline",
    marginLeft: SPACING.SPACING_XXS,
    color: COLORS.COLOR_PRIMARY,
  },
  termsAndConditionsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: SPACING.SPACING_LG,
  },
});
