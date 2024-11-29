import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLORS } from "~/constants/Colors";
import { SPACING } from "~/constants/Spacing";
import { TYPOGRAPHY } from "~/constants/Typography";

const SplitOtp = ({ onChange, resetOtp }) => {
  const main = COLORS.COLOR_SURFACE;
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(null); // Track the focused index
  const inputRefs = Array.from({ length: 4 }, () => useRef(null)); // Dynamically create refs

  const handleInputChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;

    setOTP(newOTP);

    if (text === "" && index > 0) {
      inputRefs[index - 1].current.focus(); // Move to the previous input if cleared
    } else if (text !== "" && index < otp.length - 1) {
      inputRefs[index + 1].current.focus(); // Move to the next input if filled
    }

    const otpString = newOTP.join("");
    onChange(otpString);
  };

  useEffect(() => {
    setOTP(["", "", "", ""]); // Reset the OTP state
  }, [resetOtp]);

  return (
    <View style={{ alignSelf: "center", marginVertical: SPACING.SPACING_LG }}>
      <View style={{ flexDirection: "row" }}>
        {otp.map((digit, index) => (
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: main,
                borderColor:
                  focusedIndex === index
                    ? COLORS.COLOR_PRIMARY
                    : COLORS.COLOR_BORDER,
                borderWidth: StyleSheet.hairlineWidth + 0.6,
              },
            ]}
            key={index}
          >
            <TextInput
              autoComplete="sms-otp"
              style={styles.input}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={inputRefs[index]}
              onFocus={() => setFocusedIndex(index)} // Set focus index
              onBlur={() => setFocusedIndex(null)} // Clear focus index
              // placeholder="-"
              placeholderTextColor={COLORS.COLOR_TEXT_SECONDARY}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SplitOtp;

const styles = StyleSheet.create({
  inputContainer: {
    width: 56,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginHorizontal: SPACING.SPACING_SM,
  },
  input: {
    fontSize: 20,
    color: COLORS.COLOR_TEXT_MUTED,
    textAlign: "center",
    width: "100%",
    height: "100%",
    fontFamily: TYPOGRAPHY.PRIMARY.MEDIUM,
  },
});
