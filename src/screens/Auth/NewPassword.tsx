import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "~/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
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

export default function NewPassword({ navigation }) {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
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
  const initialValues = {
    confirmPass: "",
    password: "",
  };
  const {
    control,
    reset,
    formState: { errors },
  } = useForm();
  useFocusEffect(
    React.useCallback(() => {
      return () => reset(initialValues);
    }, [reset])
  );
  const registerSubmit = async (values: typeof initialValues) => {
    console.log("Values", values);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Controller
        control={control}
        name="password"
        rules={{
          required: "signUp.password_validate",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "signUp.password_without_space",
          },
          minLength: {
            value: 8,
            message: "signUp.invaid_password",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.passwordContainer}>
              <InputComponent
                label="signUp.password_label"
                placeholder="signUp.password_placeholder"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
                isError={!!errors.password}
                maxLength={15}
              />
              <View style={styles.eyeIcon}>
                {showPassword ? (
                  <Eye
                    size={SPACING.SPACING_LG}
                    color={COLORS.COLOR_TEXT_SECONDARY}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeSlash
                    size={SPACING.SPACING_LG}
                    color={COLORS.COLOR_TEXT_SECONDARY}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                )}
              </View>
            </View>
            <View style={{ minHeight: 20 }}>
              {errors.password && (
                <TextComponent
                  style={styles.error}
                  preset="error"
                  size="FONT_SMALL_TEXT"
                  text={errors.password.message}
                />
              )}
            </View>
          </>
        )}
      />
      <Controller
        control={control}
        name="confirmPass"
        rules={{
          required: "reset_password.confirm_password_label",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "signUp.password_without_space",
          },
          minLength: {
            value: 8,
            message: "signUp.invaid_password",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.passwordContainer}>
              <InputComponent
                label="signUp.password_label"
                placeholder="reset_password.reset_pass_placeholder"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!confirm}
                isError={!!errors.password}
                maxLength={15}
              />
              <View style={styles.eyeIcon}>
                {confirm ? (
                  <Eye
                    size={SPACING.SPACING_LG}
                    color={COLORS.COLOR_TEXT_SECONDARY}
                    onPress={() => setConfirm(!confirm)}
                  />
                ) : (
                  <EyeSlash
                    size={SPACING.SPACING_LG}
                    color={COLORS.COLOR_TEXT_SECONDARY}
                    onPress={() => setConfirm(!confirm)}
                  />
                )}
              </View>
            </View>
            <View style={{ minHeight: 20 }}>
              {errors.password && (
                <TextComponent
                  style={styles.error}
                  preset="error"
                  size="FONT_SMALL_TEXT"
                  text={errors.password.message}
                />
              )}
            </View>
          </>
        )}
      />
      {/* <SignInContainer /> */}
      <Button
        titleUntranslated="Create New Password"
        // onPress={handleSubmit(registerSubmit)}
        onPress={() => {
          // navigation.navigate("Otp");
        }}
        buttonStyle={{
          borderRadius: SPACING.SPACING_RADIUS,
        }}
      />
    </View>
  );
};

const HeadingText = () => {
  return (
    <View style={styles.HeadingContainer}>
      <TextComponent
        untranslatedText="New Password"
        preset="title"
        style={{ paddingBottom: SPACING.SPACING_MD }}
      />
      <TextComponent
        untranslatedText="Your new password must be different"
        preset="body"
        style={styles.subHeading}
        color="COLOR_TEXT_SECONDARY"
      />
      <TextComponent
        untranslatedText="from previously user passwords."
        preset="body"
        style={styles.subHeading}
        color="COLOR_TEXT_SECONDARY"
      />
    </View>
  );
};

const SignInContainer = () => {
  return (
    <View style={styles.signIn}>
      <View style={styles.termsAndConditionsTextContainer}>
        <TextComponent
          untranslatedText="Remember the password?"
          preset="body"
          style={styles.tq}
          color="COLOR_TEXT_SECONDARY"
        />
        <TextComponent
          onPress={() => {}}
          text="login.sign_in"
          color="COLOR_TEXT_PRIMARY"
          style={styles.underlined}
          weight="medium"
          preset="body"
        />
      </View>
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
    right: SPACING.SPACING_XL, // Adjust based on your layout
    top: 12,
  },
});
