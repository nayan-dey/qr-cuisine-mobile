import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Button from "~/componenets/atoms/AnimatedButton";
import { useAuth } from "~/context/AuthContext";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <TextComponent
        preset="title"
        untranslatedText="Profile"
        style={{ paddingBottom: 8, alignSelf: "center" }}
      />
      <Button
        containerStyle={{ marginTop: 20, marginHorizontal: 24 }}
        onPress={() => {
          logout();
        }}
        titleUntranslated="Log Out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
