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
                borderWidth:
                  focusedIndex === index ? 2 : StyleSheet.hairlineWidth + 0.6,
              },
            ]}
            key={index}
          >
            <TextInput
              style={styles.input}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={inputRefs[index]}
              onFocus={() => setFocusedIndex(index)} // Set focus index
              onBlur={() => setFocusedIndex(null)} // Clear focus index
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
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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
