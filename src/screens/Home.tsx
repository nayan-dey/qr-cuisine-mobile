import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { TextComponent } from "~/componenets/atoms/TextComponent";
import Button from "~/componenets/atoms/AnimatedButton";
import { Screen } from "~/componenets/atoms/Screen";
import LottieView from "lottie-react-native";
import { useAuth } from "~/context/AuthContext";

export default function Home({ navigation }) {
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { logout } = useAuth();

  const playAnimation = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      animationRef.current?.play(0, 60);
    }
  };
  const handleAnimationFinish = () => {
    if (isPlaying) {
      animationRef.current?.play(60, 0);
      setTimeout(() => setIsPlaying(false), 500);
    }
  };

  return (
    <Screen preset="auto">
      <Pressable onPress={playAnimation} style={styles.button}>
        <LottieView
          ref={animationRef}
          source={require("../../assets/lottie/plusToX.json")}
          loop={false}
          autoPlay={false}
          style={styles.animation}
          onAnimationFinish={handleAnimationFinish}
        />
      </Pressable>

      <TextInput placeholder="Enter your name" />
      <Button
        onPress={() => navigation.navigate("Welcome")}
        titleUntranslated="Welcome"
      />
      <Button
        onPress={() => {
          logout();
        }}
        titleUntranslated="Welcome"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 100,
    height: 100,
  },
});
