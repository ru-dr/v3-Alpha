import { View, Text, Dimensions, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { UserIcon } from "./components/icons/UserIcon";
import { EmergencyIcon } from "./components/icons/EmergencyIcon";
import LgCard from "./components/LgCard";
import SmCard from "./components/SmCard";
import News from "./components/News";
import { ExploreIcon } from "./components/icons/ExploreIcon";
import { WeatherIcon } from "./components/icons/WeatherIcon";
import { TranslateIcon } from "./components/icons/TranslateIcon";
import { BookingIcon } from "./components/icons/BookingIcon";
import { HospitalIcon } from "./components/icons/HospitalIcon";
import { useColorScheme } from 'react-native';


const screenHeight = Dimensions.get("window").height;
const place = "India";
const date = new Date();
const hours = date.getHours();
let Timing = "";
if (hours < 12) {
  Timing = "Morning";
} else if (hours >= 12 && hours < 17) {
  Timing = "Afternoon";
} else if (hours >= 17 && hours < 19) {
  Timing = "Evening";
} else {
  Timing = "Night";
}

const user = "John doe";

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  textIntro: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Syne-Bold",
    // fontWeight: "bold"
  },
  main: {
    flex: 1,
    display: "flex",
    height: screenHeight,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textGreet: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});

export default function Page() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("./components/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./components/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("./components/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./components/fonts/Inter-SemiBold.ttf"),
    "Inter-ExtraBold": require("./components/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("./components/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./components/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("./components/fonts/Inter-Medium.ttf"),
    "Inter-Thin": require("./components/fonts/Inter-Thin.ttf"),
    "Inter-Variable": require("./components/fonts/Inter-Variable.ttf"),
    "Syne-Bold": require("./components/fonts/Syne-Bold.ttf"),
    "Syne-ExtraBold": require("./components/fonts/Syne-ExtraBold.ttf"),
    "Syne-Regular": require("./components/fonts/Syne-Regular.ttf"),
    "Syne-SemiBold": require("./components/fonts/Syne-SemiBold.ttf"),
    "Syne-Variable": require("./components/fonts/Syne-VariableFont_wght.ttf"),
    "Syne-Medium": require("./components/fonts/Syne-Medium.ttf"),
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.main}>
        {/* nav started */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ rowGap: 2 }}>
            <Text style={styles.textGreet}>
              Good {Timing}, <Text style={{fontFamily: "Syne-Bold"}}>{user}</Text>
            </Text>
          </View>
          <View
            style={{
              width: 45,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F7C84C",
              borderRadius: 50,
            }}
          >
            <UserIcon width={25} height={25} />
          </View>
        </View>
        <View style={{ marginBottom:15 }}>
          <Text style={styles.textIntro}>Discover The {place}</Text>
        </View>
        {/* nav ended */}
        {/* cards stared */}
        <Animated.View style={{ display: "flex", height: 290, justifyContent: "space-between", opacity: fadeAnim }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <LgCard txt="Translate" color="#F7C84C" Icon={TranslateIcon} path="/translate/page"/>
            <SmCard color="#5F6DF3" Icon={WeatherIcon} path="/weather/page"/>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <SmCard color="#FFFFFF" Icon={HospitalIcon} path="/hospitals/page"/>
            <LgCard txt="Emergency" color="#FC5750" Icon={EmergencyIcon} path="/emergency/page"/>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <LgCard txt="Explore" color="#8AE990" Icon={ExploreIcon} path="/explore/page"/>
            <SmCard color="#FFFFFF" Icon={BookingIcon} path="/booking/page"/>
          </View>
        </Animated.View>
        {/* cards ended */}
        {/* news started */}
        <View>
          <News />
        </View>
        {/* news ended */}
      </View>
    </SafeAreaView>
  );
}