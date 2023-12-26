import React from "react";
import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Text } from "react-native";

const _layout = () => {
  const CLERK_PUBLISHABLE_KEY = "pk_test_Y2VudHJhbC1zaGVlcGRvZy03My5jbGVyay5hY2NvdW50cy5kZXYk";
  return (
    <ThemeProvider value={DarkTheme}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarAnimation: "fade",
          animation: "fade_from_bottom",
          autoHideHomeIndicator: true,
        }}
        />
        {/* <Text style={{color: "#000"}}>{CLERK_PUBLISHABLE_KEY} OK</Text> */}
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default _layout;
