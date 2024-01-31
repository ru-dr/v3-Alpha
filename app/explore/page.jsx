import { View, Text, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../components/BackNav";
import MapView from "react-native-maps";

const page = () => {
  // get current route path

  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000", height: screenHeight }}>
        <BackNav path={"/"} />
        <View>
          <MapView style={{ width: 400, height: 300 }}></MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default page;
