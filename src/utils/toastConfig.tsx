import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, Text, View } from "react-native";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import { TxKeyPath } from "~/i18n/i18n";
import { COLORS } from "~/constants/Colors";
import Toast from "react-native-toast-message";
import { SPACING } from "~/constants/Spacing";
import { FONT_SIZE } from "~/constants/FontSize";
import { TYPOGRAPHY } from "~/constants/Typography";

const toastConfig = {
  success: ({ text1, props }: { text1: TxKeyPath; props: any }) => {
    // Accept the 'text' prop
    const icon = COLORS.COLOR_SUCCESS;
    const bg = COLORS.COLOR_SUCCESS_ACCENT;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg,
            borderColor: icon,
            borderWidth: 0.5,
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
          <FontAwesome6
            size={30}
            style={styles.iconStyle}
            color={icon}
            name="circle-check"
          />
          <TextComponent
            adjustsFontSizeToFit={true}
            text={text1}
            preset="description"
          />
          {/* Use the passed text */}
        </View>
        <Entypo
          size={40}
          color={icon}
          name="circle-with-cross"
          onPress={() => Toast.hide()} // Hide toast on press
        />
      </View>
    );
  },
  error: ({ text1, props }: { text1: TxKeyPath; props: any }) => {
    // Accept the 'text' prop
    const icon = COLORS.COLOR_ERROR;
    const bg = COLORS.COLOR_ERROR_ACCENT;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg,
            borderColor: icon,
            borderWidth: 0.5,
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
          <FontAwesome
            size={20}
            style={styles.iconStyle}
            color={icon}
            name="warning"
          />
          <TextComponent
            adjustsFontSizeToFit={true}
            text={text1}
            preset="description"
          />
          {/* Use the passed text */}
        </View>
        <Entypo
          size={30}
          color={icon}
          name="circle-with-cross"
          onPress={() => Toast.hide()} // Hide toast on press
        />
      </View>
    );
  },
  error_Untranslated: ({ text1, props }: { text1: string; props: any }) => {
    // Accept the 'text' prop
    const icon = COLORS.COLOR_ERROR;
    const bg = COLORS.COLOR_ERROR_ACCENT;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg,
            borderColor: icon,
            borderWidth: 0.5,
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
          <FontAwesome
            size={20}
            style={styles.iconStyle}
            color={icon}
            name="warning"
          />
          <Text style={styles.text}>{text1}</Text>
          {/* Use the passed text */}
        </View>
        <Entypo
          size={30}
          color={icon}
          name="circle-with-cross"
          onPress={() => Toast.hide()} // Hide toast on press
        />
      </View>
    );
  },
  info: ({ text1, props }: { text1: TxKeyPath; props: any }) => {
    // Accept the 'text' prop
    const icon = COLORS.COLOR_PRIMARY;
    const bg = COLORS.COLOR_PRIMARY_LIGHT;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg,
            borderColor: icon,
            borderWidth: 0.5,
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
          <FontAwesome
            size={30}
            style={styles.iconStyle}
            color={icon}
            name="info-circle"
          />
          <TextComponent
            adjustsFontSizeToFit={true}
            text={text1}
            preset="description"
          />
          {/* Use the passed text */}
        </View>
        <Entypo
          size={40}
          color={icon}
          name="circle-with-cross"
          onPress={() => Toast.hide()} // Hide toast on press
        />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: SPACING.SCREEN_WIDTH - 40,
    borderRadius: SPACING.SPACING_LG,
    minHeight: SPACING.SPACING_2XL,
    paddingHorizontal: SPACING.SPACING_SM,
    paddingVertical: SPACING.SPACING_SM,
    overflow: "hidden",
    justifyContent: "space-between",
    flex: 1,
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
