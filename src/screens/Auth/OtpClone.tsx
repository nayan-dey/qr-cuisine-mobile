import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "~/constants/Colors";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import AnimatedCheckbox from "~/componenets/atoms/AnimatedCheckbox";
import Button from "~/componenets/atoms/AnimatedButton";
import { SPACING } from "~/constants/Spacing";
import InputComponent from "~/componenets/atoms/inputComponent";
import { StatusBar } from "expo-status-bar";
import { Icon } from "~/componenets/atoms/Icon";
import PhoneNumberInput from "~/componenets/atoms/PhoneNumberInput";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  ArrowLeft,
  Eye,
  EyeSlash,
  Icon as IconSax,
} from "iconsax-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SplitOtp from "~/componenets/Auth/SplitOtp";
import { useForgotPassword, useVarifyOtp } from "~/services/auth";
import Toast from "react-native-toast-message";

const countryCode = process.env.EXPO_PUBLIC_COUNTRY_CODE;
export default function OtpClone({ navigation }) {
  const mobile = "+91 8918335468";
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
  const lastFourVisible = mobile;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
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
                onPress={() => navigation.goBack()}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={styles.topContainer}
              >
                <ArrowLeft size={18} color={COLORS.COLOR_TEXT_MUTED} />
              </Pressable>
            </Animated.View>
            <HeadingText lastFourVisible={lastFourVisible} />
            <TextFileds
              handleFocus={handleFocus}
              navigation={navigation}
              mobileNumber={mobile}
            />
            {/* <SignInContainer /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TextFileds = ({
  handleFocus,
  navigation,
  mobileNumber,
}: {
  handleFocus: () => void;
  navigation: any;
  mobileNumber: string;
}) => {
  const initialValues = {
    otp: "",
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
  const { mutateAsync: verifyOtp, isPending } = useVarifyOtp();

  const registerSubmit = async (values: typeof initialValues) => {
    try {
      const response = await verifyOtp({
        mobile: mobileNumber,
        otp: values.otp,
      });
      console.log("response", response);
      if (response.message === "OTP verified successfully.") {
        navigation.navigate("NewPassword", { mobile: mobileNumber });
      }
    } catch (error) {
      console.log("first", error);
      Toast.show({
        type: "error",
        text1: "Wrong OTP Entered",
      });
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Controller
        control={control}
        name="otp"
        rules={{
          required: "otp.otp_required",
          minLength: {
            value: 4,
            message: "otp.otp_validation",
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <SplitOtp
              onChange={(otp: string) => {
                onChange(otp);
              }}
              resetOtp={false}
              isError={!!errors.otp}
            />
            {fieldState.error && (
              <TextComponent
                style={[
                  styles.error,
                  {
                    alignSelf: "center",
                  },
                ]}
                preset="error"
                text={fieldState.error.message}
              />
            )}
          </>
        )}
      />
      <SignInContainer mobile={mobileNumber} />
      <Button
        titleUntranslated="Verify"
        onPress={handleSubmit(registerSubmit)}
        buttonStyle={{
          borderRadius: SPACING.SPACING_RADIUS,
        }}
        loading={isPending}
      />
    </View>
  );
};

const HeadingText = ({ lastFourVisible }) => {
  return (
    <View style={styles.HeadingContainer}>
      <TextComponent
        untranslatedText="Verify Code"
        preset="title"
        style={{ paddingBottom: SPACING.SPACING_MD }}
      />
      <TextComponent
        untranslatedText="Please enter the code sent to your phone"
        preset="body"
        style={styles.subHeading}
        color="COLOR_TEXT_SECONDARY"
      />
      <TextComponent
        untranslatedText={lastFourVisible}
        preset="body"
        weight="medium"
        style={[
          styles.subHeading,
          {
            color: COLORS.COLOR_PRIMARY,
          },
        ]}
      />
    </View>
  );
};

const SignInContainer = ({ mobile }) => {
  const fullMobileWithCountryCode = mobile;
  const { mutateAsync: forgotPass, isPending } = useForgotPassword();

  const [isResendCode, setIsResendCode] = useState(false);
  const [timer, setTimer] = useState(60); // Countdown timer
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to show "OTP sent successfully"

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount
    } else {
      setIsResendCode(true); // Enable Resend button
    }
  }, [timer]);

  const HandleResendCode = async () => {
    try {
      const response = await forgotPass(fullMobileWithCountryCode);
      if (response.message === "OTP sent successfully") {
        setTimer(60); // Reset timer
        setIsResendCode(false); // Disable Resend button
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message || "Failed to resend OTP",
      });
    }
  };
  return (
    <View style={styles.signIn}>
      <TextComponent
        untranslatedText="Don’t receive OTP?"
        preset="body"
        style={styles.tq}
        color="COLOR_TEXT_SECONDARY"
        weight="medium"
      />
      {showSuccessMessage ? (
        <TextComponent
          untranslatedText="OTP sent successfully"
          weight="medium"
          preset="body"
          style={{ color: COLORS.COLOR_PRIMARY }}
        />
      ) : isResendCode ? (
        <TextComponent
          onPress={HandleResendCode}
          untranslatedText="Resend code"
          color="COLOR_TEXT_PRIMARY"
          style={styles.underlined}
          weight="medium"
          preset="body"
        />
      ) : (
        <TextComponent
          untranslatedText={`Resend in ${timer}s`}
          color="COLOR_TEXT_SECONDARY"
          style={styles.timer}
          weight="medium"
          preset="body"
        />
      )}
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
  timer: {
    color: COLORS.COLOR_PRIMARY,
  },
});
