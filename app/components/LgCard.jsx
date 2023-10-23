import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Link } from "expo-router";
import { Pressable } from "react-native";

const LgCard = ({ txt, color, Icon, path }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("../components/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../components/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../components/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../components/fonts/Inter-SemiBold.ttf"),
    "Inter-ExtraBold": require("../components/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../components/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("../components/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../components/fonts/Inter-Medium.ttf"),
    "Inter-Thin": require("../components/fonts/Inter-Thin.ttf"),
    "Inter-Variable": require("../components/fonts/Inter-Variable.ttf"),
    "Syne-Bold": require("../components/fonts/Syne-Bold.ttf"),
    "Syne-ExtraBold": require("../components/fonts/Syne-ExtraBold.ttf"),
    "Syne-Regular": require("../components/fonts/Syne-Regular.ttf"),
    "Syne-SemiBold": require("../components/fonts/Syne-SemiBold.ttf"),
    "Syne-Variable": require("../components/fonts/Syne-VariableFont_wght.ttf"),
    "Syne-Medium": require("../components/fonts/Syne-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity>
      <Link href={path} asChild>
        <Pressable>
          <View
            style={{
              backgroundColor: color,
              borderColor: "white",
              width: 250,
              height: 90,
              borderRadius: 25,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: 90,
              }}
            >
              <View>{Icon && <Icon />}</View>
              <View>
                <Text style={{ fontFamily: "Inter-Light", fontSize: 30 }}>
                  {txt}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </TouchableOpacity>
  );
};

export default LgCard;
