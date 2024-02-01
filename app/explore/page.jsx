import { View, Text, Dimensions, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../components/BackNav";
import MapView from "react-native-maps";
import { UserLocationContext } from "../context/UserLocationContext";
import { Marker } from "react-native-maps";
import MapStyle from "./MapStyle.json";

const page = () => {
  // get current route path

  const { location, setLocation } = useContext(UserLocationContext);
  const screenHeight = Dimensions.get("window").height;
  return (
    location?.coords.latitude && (
      <SafeAreaView>
        <StatusBar style="light" backgroundColor="#000" />
        <View style={{ backgroundColor: "#000", height: screenHeight }}>
          <BackNav path={"/"} />
          <View>
          
            <MapView
              style={{ width: 400, height: 300 }}
              customMapStyle={MapStyle}
              region={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0221,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location?.coords.latitude,
                  longitude: location?.coords.longitude,
                }}
              >
                <Image
                  source={require("../../assets/images/marker.png")}
                  style={{ width: 30, height: 30 }}
                />
              </Marker>
            </MapView>
            
          </View>
        </View>
      </SafeAreaView>
    )
  );
};

export default page;
