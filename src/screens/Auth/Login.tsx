import {
  KeyboardAvoidingView,
  Modal,
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
import { Eye, EyeSlash, Icon as IconSax } from "iconsax-react-native";
import { Image } from "expo-image";

export default function SignUp({ navigation }) {
  const bg = COLORS.COLOR_BACKGROUND;
  const { top } = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const handleFocus = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleGuestLoginPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={isModalVisible ? "rgba(0,0,0,0.5)" : bg}
          style={isModalVisible ? "light" : "dark"}
        />
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
            <HeadingText />
            <TextFileds handleFocus={handleFocus} navigation={navigation} />
            <OrSection />
            <SignInContainer navigation={navigation} />
            <Button
              title="signUp.guest_login"
              onPress={() => {
                handleGuestLoginPress();
              }}
              buttonStyle={{
                borderRadius: SPACING.SPACING_RADIUS,
                backgroundColor: COLORS.COLOR_SURFACE,
                borderWidth: StyleSheet.hairlineWidth + 0.7,
                borderColor: COLORS.COLOR_BORDER,
              }}
              textStyle={{
                color: COLORS.COLOR_TEXT_MUTED,
              }}
            />
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={closeModal}
            >
              <Pressable
                style={styles.modalBackdrop}
                onPress={() => {
                  closeModal();
                }}
              >
                <View style={styles.modalContent}>
                  <View
                    style={{
                      width: 48,
                      height: 4,
                      backgroundColor: COLORS.COLOR_BORDER,
                      alignSelf: "center",
                    }}
                  />
                  <View
                    style={{
                      alignSelf: "center",
                      paddingTop: SPACING.SPACING_3XL,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/ghost.svg")}
                      style={{
                        width: SPACING.SCREEN_WIDTH * 0.2,
                        height: SPACING.SCREEN_WIDTH * 0.2,
                        marginBottom: SPACING.SPACING_MD,
                      }}
                      contentFit="contain"
                    />
                    <TextComponent
                      preset="subtitle"
                      weight="medium"
                      untranslatedText="Guest Login Limitations"
                      style={{ paddingBottom: SPACING.SPACING_MD }}
                    />
                    <TextComponent
                      preset="smallText"
                      untranslatedText="By logging in as a guest, your orders won’t be saved"
                    />
                    <TextComponent
                      preset="smallText"
                      untranslatedText="in order history, loyalty points won’t be claimed, and"
                    />
                    <TextComponent
                      preset="smallText"
                      untranslatedText="you won’t appear on the leaderboard."
                      style={{ paddingBottom: SPACING.SPACING_MD }}
                    />
                    <View
                      style={{
                        width: "100%",
                      }}
                    ></View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      position: "absolute",
                      bottom: SPACING.SPACING_LG,
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      titleUntranslated="Continue Guest Login"
                      buttonStyle={{
                        borderRadius: SPACING.SPACING_RADIUS,
                      }}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </Pressable>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TextFileds = ({
  handleFocus,
  navigation,
}: {
  handleFocus: () => void;
  navigation: any;
}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
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
    console.log("Values", values);
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
            value: 8,
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
                    // style={styles.eyeIcon}
                  />
                ) : (
                  <EyeSlash
                    size={SPACING.SPACING_LG}
                    color={COLORS.COLOR_TEXT_SECONDARY}
                    onPress={() => setShowPassword(!showPassword)}
                    // style={styles.eyeIcon}
                  />
                )}
              </View>
              {/* <Icon
                icon={showPassword ? "eyeOpen" : "eyeClose"}
                size={24}
                color={COLORS.COLOR_TEXT_SECONDARY}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              /> */}
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
      <View style={styles.checkboxContainer}>
        <View style={styles.termsAndConditionsTextContainer}>
          <TextComponent
            text="login.forgot_password"
            preset="body"
            style={styles.underlined}
            weight="medium"
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          />
        </View>
      </View>
      <Button
        title="login.sign_in"
        onPress={handleSubmit(registerSubmit)}
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
        text="login.sign_in"
        preset="title"
        style={{ paddingBottom: SPACING.SPACING_MD }}
      />
      <TextComponent
        untranslatedText="Access your account, manage reservations, and"
        preset="body"
        style={styles.subHeading}
        color="COLOR_TEXT_SECONDARY"
      />
      <TextComponent
        untranslatedText="enjoy exclusive rewards with ease."
        preset="body"
        style={styles.subHeading}
        color="COLOR_TEXT_SECONDARY"
      />
    </View>
  );
};

const OrSection = () => {
  const borderColor = COLORS.COLOR_BORDER;
  return (
    <>
      <View style={styles.orContainer}>
        <View
          style={[
            styles.orStick,
            {
              borderColor: borderColor,
            },
          ]}
        />
        <TextComponent
          text="signUp.or_sign_up_with"
          preset="caption"
          style={styles.tq}
          color="COLOR_TEXT_SECONDARY"
        />
        <View
          style={[
            styles.orStick,
            {
              borderColor: borderColor,
            },
          ]}
        />
      </View>
    </>
  );
};

const SignInContainer = ({ navigation }) => {
  return (
    <View style={styles.signIn}>
      <View style={styles.termsAndConditionsTextContainer}>
        <TextComponent
          text="login.dont_have_an_account"
          preset="body"
          style={styles.tq}
          color="COLOR_TEXT_SECONDARY"
          weight="medium"
        />
        <TextComponent
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          text="signUp.sign_up_button"
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
  HeadingContainer: {
    flex: 0.2,
    alignItems: "center",
    paddingVertical: SPACING.SPACING_XL,
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
    marginVertical: SPACING.SPACING_LG,
    alignSelf: "center",
  },
  termsAndConditionsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
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

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.COLOR_BACKGROUND,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: SPACING.SPACING_LG,
    height: SPACING.SCREEN_HEIGHT / 2, // Half the screen
  },
});
