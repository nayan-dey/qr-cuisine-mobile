import React, { useState } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { TextComponent } from "./TextComponent";
import { TxKeyPath } from "~/i18n/i18n";
import { COLORS } from "~/constants/Colors";
import { translate } from "~/i18n/translate";
import { SPACING } from "~/constants/Spacing";
import { FONT_SIZE } from "~/constants/FontSize";

import { Dropdown } from "react-native-element-dropdown";
import { TYPOGRAPHY } from "~/constants/Typography";

export interface InputWithLabelProps extends TextInputProps {
  label?: TxKeyPath;
  placeholder: TxKeyPath;
  isError: boolean;
}

const PhoneNumberInput: React.FC<InputWithLabelProps> = ({
  label,
  placeholder,
  isError,
  ...props
}) => {
  const main = COLORS.COLOR_SURFACE;
  const placeholderColor = COLORS.COLOR_TEXT_SECONDARY;
  const border = COLORS.COLOR_ERROR;

  // State for selected country code
  const countryCodes = [
    { label: "+1", value: "+1" },
    { label: "+91", value: "+91" },
    { label: "+44", value: "+44" },
  ];

  // State for selected country code
  const [countryCode, setCountryCode] = useState("+1");
  return (
    <View style={styles.container}>
      <TextComponent
        preset="body"
        style={styles.label}
        text={label}
        weight="medium"
        color="COLOR_TEXT_SECONDARY"
      />
      <View style={[styles.inputContainer, { borderColor: "transparent" }]}>
        <Dropdown
          data={countryCodes}
          labelField="label"
          renderRightIcon={() => null}
          valueField="value"
          value={countryCode}
          onChange={(item) => setCountryCode(item.value)}
          style={styles.countryCodeDropdown}
          placeholderStyle={{ color: COLORS.COLOR_TEXT_SECONDARY }}
          selectedTextStyle={{ color: COLORS.COLOR_TEXT_MUTED }}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.dropdownItemText}
          disable={true}
        />
        <View style={styles.bar} />
        <TextInput
          placeholder={translate(placeholder)}
          style={styles.input}
          placeholderTextColor={placeholderColor}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.SPACING_XS,
    width: "100%",
  },
  label: {
    marginBottom: SPACING.SPACING_XS,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.COLOR_SURFACE,
    borderRadius: 12,
    borderWidth: 1,
  },
  countryCodeDropdown: {
    width: 50, // Adjust width as needed
    height: SPACING.SPACING_3XL,
    paddingLeft: SPACING.SPACING_MD,
    paddingRight: SPACING.SPACING_XS,
    justifyContent: "center",
  },
  dropdownContainer: {
    borderRadius: 12,
    backgroundColor: COLORS.COLOR_SURFACE,
  },
  dropdownItemText: {
    color: COLORS.COLOR_TEXT_MUTED,
    fontSize: FONT_SIZE.FONT_BODY,
    fontFamily: TYPOGRAPHY.PRIMARY.REGULAR,
  },
  input: {
    flex: 1,
    height: SPACING.SPACING_3XL,
    fontSize: FONT_SIZE.FONT_BODY,
    fontFamily: TYPOGRAPHY.PRIMARY.REGULAR,
    paddingHorizontal: SPACING.SPACING_MD,
    color: COLORS.COLOR_TEXT_PRIMARY,
  },
  bar: {
    borderLeftWidth: StyleSheet.hairlineWidth + 0.8,
    height: SPACING.SPACING_XL,
    borderColor: COLORS.COLOR_BORDER,
  },
});

export default PhoneNumberInput;
