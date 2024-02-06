import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs options={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIconStyle: {
            backgroundColor: "black",
            color: "white",
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          headerShown: false,
          tabBarLabel: "Emergency",
          tabBarIconStyle: {
            backgroundColor: "black",
            color: "white",
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarLabel: "Explore",
          tabBarIconStyle: {
            backgroundColor: "black",
            color: "white",
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="translate"
        options={{
          headerShown: false,
          tabBarLabel: "Translate",
          tabBarIconStyle: {
            backgroundColor: "black",
            color: "white",
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="white" />
          ),
        }}
      />
    </Tabs>
  );
};
