import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Location from "expo-location";
import { UserLocationContext } from "./context/UserLocationContext";

const _layout = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location)
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  return (
    <ThemeProvider value={DarkTheme}>
      <UserLocationContext.Provider value={{location, setLocation}}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarAnimation: "fade",
          animation: "fade_from_bottom",
          autoHideHomeIndicator: true,
        }}
      />
      </UserLocationContext.Provider>
    </ThemeProvider>
  );
};

export default _layout;
