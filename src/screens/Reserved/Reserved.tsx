import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextComponent } from "~/componenets/atoms/TextComponent";

export default function Reserved() {
  return (
    <View style={styles.container}>
      <TextComponent
        preset="title"
        untranslatedText="Reserved"
        style={{ paddingBottom: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
