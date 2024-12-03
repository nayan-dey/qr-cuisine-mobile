import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { TextComponent } from "./TextComponent";
import { TxKeyPath } from "~/i18n/i18n";
import { COLORS } from "~/constants/Colors";
import { translate } from "~/i18n/translate";
import { SPACING } from "~/constants/Spacing";
import { FONT_SIZE } from "~/constants/FontSize";
import { TYPOGRAPHY } from "~/constants/Typography";

export interface InputWithLabelProps extends TextInputProps {
  label?: TxKeyPath;
  placeholder?: TxKeyPath;
  isError?: boolean;
  untanslatedLabel?: string;
  placeholderUntranslated?: string;
}

const InputComponent: React.FC<InputWithLabelProps> = ({
  label,
  placeholder,
  isError,
  untanslatedLabel,
  placeholderUntranslated,
  ...props
}) => {
  const main = COLORS.COLOR_SURFACE;
  const placeholderColor = COLORS.COLOR_TEXT_PLACEHOLDER;
  const border = COLORS.COLOR_ERROR;

  return (
    <View style={styles.container}>
      <TextComponent
        preset="body"
        style={styles.label}
        text={label}
        untranslatedText={untanslatedLabel}
        weight="medium"
        color="COLOR_TEXT_SECONDARY"
      />
      <TextInput
        placeholder={
          placeholder ? translate(placeholder) : placeholderUntranslated
        }
        style={[
          styles.input,
          {
            backgroundColor: main,
            borderColor: "transparent",
            borderWidth: isError ? 1 : 0,
          },
        ]}
        placeholderTextColor={placeholderColor}
        {...props}
      />
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
  input: {
    height: SPACING.SPACING_3XL,
    borderRadius: 12,
    paddingHorizontal: SPACING.SPACING_MD,
    fontSize: FONT_SIZE.FONT_BODY,
    fontFamily: TYPOGRAPHY.PRIMARY.REGULAR,
    color: COLORS.COLOR_TEXT_PRIMARY,
  },
  error: {
    marginVertical: SPACING.SPACING_XS,
  },
});

export default InputComponent;
