import { Tabs } from "expo-router";
import { TranslateTabIcon } from "../components/icons/tabicons/TranslateTabIcon";
import { ExploreTabIcon } from "../components/icons/tabicons/ExploreTabIcon";
import { EmergencyTabIcon } from "../components/icons/tabicons/EmergencyTabIcon";
import { HomeTabIcon } from "../components/icons/tabicons/HomeTabIcon";
import { BlurView } from "@react-native-community/blur";
import { View } from "react-native";

export default () => {
  return (
    <Tabs
      options={{ headerShown: false }}
      screenOptions={{
        tabBarStyle: {
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          position: "absolute",
          height: 60,
          display: "flex",
          alignItems: "center",
        },
        tabBarShowLabel: false,
        tabBarBackground: () => {
          return (
            <BlurView
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              blurAmount={10}
              blurType="materialLight"
              overlayColor="transparent"
            />
          );
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <HomeTabIcon name="home" />,
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <EmergencyTabIcon name="emergency" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <ExploreTabIcon name="explore" />,
        }}
      />
      <Tabs.Screen
        name="translate"
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <TranslateTabIcon name="translate" />
          ),
        }}
      />
    </Tabs>
  );
};
