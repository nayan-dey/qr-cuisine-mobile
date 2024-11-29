import { StyleSheet, Text, View } from "react-native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import { TxKeyPath } from "~/i18n/i18n";
import { COLORS } from "~/constants/Colors";
import { SPACING } from "~/constants/Spacing";
import { FONT_SIZE } from "~/constants/FontSize";
import { TYPOGRAPHY } from "~/constants/Typography";
import { CloseSquare, Warning2 } from "iconsax-react-native";
import { Space } from "lucide-react-native";
import Toast from "react-native-toast-message";

const toastConfig = {
  error: ({ text1, props }: { text1: string; props: any }) => {
    // Accept the 'text' prop
    const icon = COLORS.COLOR_ERROR;
    const bg = COLORS.COLOR_SURFACE;
    const border = COLORS.COLOR_BORDER;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg,
            borderColor: border,
            borderWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <View
          style={[
            styles.messageContainer,
            {
              backgroundColor: bg,
            },
          ]}
        >
          <Warning2
            size={24}
            color={icon}
            style={styles.iconStyle}
            variant="Bulk"
          />

          <TextComponent
            // adjustsFontSizeToFit={true}
            untranslatedText={text1}
            preset="caption"
            numberOfLines={1}
            style={{ color: COLORS.COLOR_ERROR }}
          />
        </View>
        <CloseSquare
          size={24}
          color={icon}
          variant="Bulk"
          onPress={() => Toast.hide()}
        />
      </View>
    );
  },
  warning: ({ text1, props }: { text1: TxKeyPath; props: any }) => {
    // Accept the 'text' prop
    const icon = COLORS.COLOR_WARNING;
    const bg = "#fdedc8";
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg,
            // borderColor: icon,
            // borderWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <View
          style={[
            styles.messageContainer,
            {
              backgroundColor: bg,
            },
          ]}
        >
          <Warning2 size={24} color={icon} style={styles.iconStyle} />

          <TextComponent
            // adjustsFontSizeToFit={true}
            text={text1}
            preset="description"
            numberOfLines={1}
          />
          {/* Use the passed text */}
        </View>
        <CloseSquare size={24} color={icon} onPress={() => Toast.hide()} />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: SPACING.SCREEN_WIDTH - 40,
    borderRadius: SPACING.SPACING_RADIUS,
    minHeight: SPACING.SPACING_3XL,
    paddingHorizontal: SPACING.SPACING_MD,
    paddingVertical: SPACING.SPACING_SM,
    overflow: "hidden",
    justifyContent: "space-between",
    flex: 1,
    marginTop: SPACING.SPACING_SM,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.7,
  },
  iconStyle: {
    marginRight: SPACING.SPACING_SM,
  },
  text: {
    fontSize: FONT_SIZE.FONT_SMALL_TEXT,
    lineHeight: 24,
    fontWeight: "400",
    fontFamily: TYPOGRAPHY.PRIMARY.REGULAR,
    color: COLORS.COLOR_TEXT_SECONDARY,
  },
});

export default toastConfig;
