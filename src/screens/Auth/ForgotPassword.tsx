import {
  BackHandler,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "~/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Button from "~/componenets/atoms/AnimatedButton";
import { SPACING } from "~/constants/Spacing";
import { StatusBar } from "expo-status-bar";
import PhoneNumberInput from "~/componenets/atoms/PhoneNumberInput";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ArrowLeft, Icon as IconSax } from "iconsax-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useForgotPassword } from "~/services/auth";
import Toast from "react-native-toast-message";

const countryCode = process.env.EXPO_PUBLIC_COUNTRY_CODE;
export default function ForgotPassword({ navigation }) {
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

  const bg = COLORS.COLOR_BACKGROUND;
  const { top } = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const handleFocus = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.replace("Login");
        return true; // Prevent the default behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        // behavior={"padding"}
        style={{ flex: 1 }}
      >
        <StatusBar backgroundColor={COLORS.COLOR_BACKGROUND} style="dark" />
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: bg,
            paddingTop: SPACING.SPACING_LG,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Animated.View style={animatedStyle}>
              <Pressable
                onPress={() => navigation.replace("Login")}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={styles.topContainer}
              >
                <ArrowLeft size={18} color={COLORS.COLOR_TEXT_MUTED} />
              </Pressable>
            </Animated.View>
            <HeadingText />
            <TextFileds handleFocus={handleFocus} navigation={navigation} />
            {/* <SignInContainer /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TextFileds = ({
  navigation,
}: {
  handleFocus: () => void;
  navigation: any;
}) => {
  const { mutateAsync: forgotPass, isPending } = useForgotPassword();
  const initialValues = {
    phone: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useFocusEffect(
    React.useCallback(() => {
      return () => reset(initialValues);
    }, [reset])
  );
  const registerSubmit = async (values: typeof initialValues) => {
    // const fullMobileWithCountryCode = `${countryCode} ${values.phone}`;

    // navigation.navigate("Otp", {
    //   mobile: fullMobileWithCountryCode,
    // });

    //DO THIS ON PRODDDD

    const fullMobileWithCountryCode = `${countryCode} ${values.phone}`;
    try {
      const response = await forgotPass(fullMobileWithCountryCode);
      console.log("response", response);
      if (response.message === "OTP sent successfully") {
        navigation.navigate("Otp", {
          mobile: fullMobileWithCountryCode,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Controller
        control={control}
        name="phone"
        rules={{
          required: "signUp.phone_validate",
          pattern: {
            // Update regex to match a standard phone number format (e.g., 10-digit format)
            value: /^[0-9]{10}$/,
            message: "signUp.invalid_phone_number",
          },
          minLength: {
            value: 10,
            message: "signUp.phone_validate",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <PhoneNumberInput
              label="signUp.phone_number"
              placeholder="signUp.phone_number_placeholder"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isError={!!errors.phone}
              keyboardType="numeric"
              maxLength={10}
              autoFocus={true}
            />
            <View style={{ minHeight: 20 }}>
              {errors.phone && (
                <TextComponent
                  style={styles.error}
                  preset="error"
                  text={errors.phone.message}
                  size="FONT_SMALL_TEXT"
                />
              )}
            </View>
          </>
        )}
      />
      <SignInContainer navigation={navigation} />
      <Button
        titleUntranslated="Send OTP Code"
        onPress={handleSubmit(registerSubmit)}
        // onPress={() => {
        //   navigation.navigate("Otp");
        // }}
        buttonStyle={{
          borderRadius: SPACING.SPACING_RADIUS,
        }}
        loading={isPending}
      />

      {/* <Button
        titleUntranslated="Send OTP Code"
        // onPress={handleSubmit(registerSubmit)}
        onPress={() => {
          navigation.navigate("Otp", {
            mobile: "+91 8918335468",
          });
        }}
        buttonStyle={{
          borderRadius: SPACING.SPACING_RADIUS,
        }}
        loading={isPending}
      /> */}
    </View>
  );
};

const HeadingText = () => {
  return (
    <View style={styles.HeadingContainer}>
      <TextComponent
        untranslatedText="Forget Password"
        preset="title"
        style={{ paddingBottom: SPACING.SPACING_MD }}
      />
      <TextComponent
        untranslatedText="Reset your password to regain access to your"
        preset="body"
        style={styles.subHeading}
        color="COLOR_TEXT_SECONDARY"
      />
      <TextComponent
        untranslatedText="account securely and quickly."
        preset="body"
        style={styles.subHeading}
        color="COLOR_TEXT_SECONDARY"
      />
    </View>
  );
};

const SignInContainer = ({ navigation }) => {
  return (
    <View style={styles.signIn}>
      <TextComponent
        untranslatedText="Remember the password?"
        preset="body"
        style={styles.tq}
        color="COLOR_TEXT_SECONDARY"
        weight="medium"
      />
      <TextComponent
        onPress={() => {
          navigation.navigate("Login");
        }}
        text="login.sign_in"
        color="COLOR_TEXT_PRIMARY"
        style={styles.underlined}
        weight="medium"
        preset="body"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  HeadingContainer: {
    flex: 0.2,
    alignItems: "center",
    paddingVertical: SPACING.SPACING_SM,
  },
  subHeading: {
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  inputContainer: {
    // flex: 0.5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: SPACING.SPACING_LG,
    marginTop: SPACING.SPACING_SM,
  },
  tq: {
    marginLeft: SPACING.SPACING_XS,
  },
  orContainer: {
    marginVertical: SPACING.SPACING_MD,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orStick: {
    borderWidth: StyleSheet.hairlineWidth + 0.3,
    width: 60,
    marginHorizontal: SPACING.SPACING_SM,
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    height: 32,
    width: 32,
  },
  error: {
    minHeight: 20,
  },
  signIn: {
    marginBottom: SPACING.SPACING_LG,
    alignSelf: "center",
    alignItems: "center",
  },
  termsAndConditionsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: SPACING.SPACING_SM,
  },
  underlined: {
    textDecorationLine: "underline",
    marginLeft: SPACING.SPACING_XXS,
    color: COLORS.COLOR_PRIMARY,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    // position: "absolute",
    right: SPACING.SPACING_2XL, // Adjust based on your layout
    top: 14,
  },
});
