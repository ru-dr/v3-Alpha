import React from "react";
import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

const _layout = () => {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarAnimation: "fade",
          animation: "fade_from_bottom",
          autoHideHomeIndicator: true,
        }}
      />
    </ThemeProvider>
  );
};

export default _layout;
