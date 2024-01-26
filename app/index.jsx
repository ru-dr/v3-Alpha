import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UserIcon } from "./components/icons/UserIcon";
import { EmergencyIcon } from "./components/icons/EmergencyIcon";
import LgCard from "./components/LgCard";
import SmCard from "./components/SmCard";
import { ExploreIcon } from "./components/icons/ExploreIcon";
import { WeatherIcon } from "./components/icons/WeatherIcon";
import { TranslateIcon } from "./components/icons/TranslateIcon";
import { BookingIcon } from "./components/icons/BookingIcon";
import { HospitalIcon } from "./components/icons/HospitalIcon";
import { Link } from "expo-router";
import { getLocalUser } from "./utils/storage";
import News from "./components/News";

const screenHeight = Dimensions.get("window").height;

const Page = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [userName, setUserName] = useState("");

  // read from local storage
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLocalUser();
      if (user) setUserName(user.name);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    textIntro: {
      color: "#fff",
      fontSize: 25,
      fontFamily: "Syne-Bold",
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

  const onLayoutRootView = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
    } catch (error) {
      console.error("Error hiding splash screen:", error);
    }
  }, []);

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
    "Barlow-Black": require("./components/fonts/Barlow-Black.ttf"),
    "Barlow-Bold": require("./components/fonts/Barlow-Bold.ttf"),
    "Barlow-ExtraBold": require("./components/fonts/Barlow-ExtraBold.ttf"),
    "Barlow-ExtraLight": require("./components/fonts/Barlow-ExtraLight.ttf"),
    "Barlow-Light": require("./components/fonts/Barlow-Light.ttf"),
    "Barlow-Medium": require("./components/fonts/Barlow-Medium.ttf"),
    "Barlow-Regular": require("./components/fonts/Barlow-Regular.ttf"),
    "Barlow-SemiBold": require("./components/fonts/Barlow-SemiBold.ttf"),
    "Barlow-Thin": require("./components/fonts/Barlow-Thin.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.main}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ rowGap: 2 }}>
            <Text style={styles.textGreet}>
              Good {Timing},{" "}
              <Text style={{ fontFamily: "Syne-Bold" }}>{userName}</Text>
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
            <Link href="/auth/profile/page" asChild>
              <Pressable>
                <UserIcon width={25} height={25} />
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.textIntro}>Discover The {place}</Text>
        </View>
        <Animated.View
          style={{
            height: 290,
            justifyContent: "space-between",
            opacity: fadeAnim,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <LgCard
              txt="Translate"
              color="#F7C84C"
              Icon={TranslateIcon}
              path="/translate/page"
            />
            <SmCard color="#5F6DF3" Icon={WeatherIcon} path="/weather/page" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <SmCard
              color="#FFFFFF"
              Icon={HospitalIcon}
              path="/hospitals/page"
            />
            <LgCard
              txt="Emergency"
              color="#FC5750"
              Icon={EmergencyIcon}
              path="/emergency/page"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <LgCard
              txt="Explore"
              color="#8AE990"
              Icon={ExploreIcon}
              path="/explore/page"
            />
            <SmCard color="#FFFFFF" Icon={BookingIcon} path="/booking/page" />
          </View>
        </Animated.View>
        {/* news started */}
        <View>
          <News />
        </View>
        {/* news ended */}
      </View>
    </SafeAreaView>
  );
};

export default Page;
