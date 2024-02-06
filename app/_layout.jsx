import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Location from "expo-location";
import { UserLocationContext } from "./context/UserLocationContext";

const StackLayout = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <ThemeProvider value={DarkTheme}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <Stack
          screenOptions={{
            statusBarAnimation: "fade",
            animation: "fade_from_bottom",
            autoHideHomeIndicator: true,
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            screenOptions={{
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="booking/index"
            screenOptions={{
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="weather/index"
            screenOptions={{
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="hospitals/index"
            screenOptions={{
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/login/index"
            screenOptions={{
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/profile/index"
            screenOptions={{
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="oauthredirect"
            screenOptions={{
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
              headerShown: false,
            }}
          />
        </Stack>
      </UserLocationContext.Provider>
    </ThemeProvider>
  );
};

export default StackLayout;
