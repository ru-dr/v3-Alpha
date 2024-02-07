import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UserIcon } from "../../components/icons/UserIcon";
import { EmergencyIcon } from "../../components/icons/EmergencyIcon";
import LgCard from "../../components/LgCard";
import SmCard from "../../components/SmCard";
import { ExploreIcon } from "../../components/icons/ExploreIcon";
import { WeatherIcon } from "../../components/icons/WeatherIcon";
import { TranslateIcon } from "../../components/icons/TranslateIcon";
import { BookingIcon } from "../../components/icons/BookingIcon";
import { HospitalIcon } from "../../components/icons/HospitalIcon";
import { Link } from "expo-router";
import { getLocalUser } from "../../utils/storage";
import News from "../../components/News";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

const screenHeight = Dimensions.get("window").height;

const Page = () => {
  const opacityAnim = useSharedValue(0);
  const translateYAnim = useSharedValue(300); // start from 100 pixels below

  useEffect(() => {
    opacityAnim.value = withTiming(1, { duration: 1500 });
    translateYAnim.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  }, [opacityAnim, translateYAnim]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
      transform: [{ translateY: translateYAnim.value }],
    };
  });

  const [userName, setUserName] = useState("");

  // read from local storage
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLocalUser();
      if (user) setUserName(user.name);
    };
    fetchUser();
  }, []);

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
    "Inter-Regular": require("../../../assets/fonts/Inter-Regular.ttf"),
    "Syne-Bold": require("../../../assets/fonts/Syne-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor="#000" />
      <Animated.View
        style={[
          {
            flex: 1,
            display: "flex",
            height: screenHeight,
            marginHorizontal: 20,
            marginVertical: 10,
          },
          animatedStyles,
        ]}
      >
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
            <Link href="/auth/profile" asChild>
              <Pressable>
                <UserIcon width={25} height={25} />
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.textIntro}>Discover The {place}</Text>
        </View>
        <View
          style={[
            {
              height: 290,
              justifyContent: "space-between",
            },
          ]}
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
              path="/translate"
            />
            <SmCard color="#5F6DF3" Icon={WeatherIcon} path="/weather" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <SmCard color="#FFFFFF" Icon={HospitalIcon} path="/hospitals" />
            <LgCard
              txt="Emergency"
              color="#FC5750"
              Icon={EmergencyIcon}
              path="/emergency"
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
              path="/explore"
            />
            <SmCard color="#FFFFFF" Icon={BookingIcon} path="/booking" />
          </View>
        </View>
        {/* news started */}
        <View>
          <News />
        </View>
        {/* news ended */}
      </Animated.View>
    </SafeAreaView>
  );
};

export default Page;
