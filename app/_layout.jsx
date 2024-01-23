import React from "react";
import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { ClerkProvider } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";

const _layout = () => {
  const CLERK_KEY = CLERK_PUBLISHABLE_KEY;
  return (
    <ThemeProvider value={DarkTheme}>
      <ClerkProvider publishableKey={CLERK_KEY}>
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
