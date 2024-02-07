import { View, Text, Dimensions, Image } from "react-native";
import React, { useContext , useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import MapView from "react-native-maps";
import { UserLocationContext } from "../../context/UserLocationContext";
import { Marker } from "react-native-maps";
import MapStyle from "./MapStyle.json";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

const page = () => {
  // get current route path
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

  const { location, setLocation } = useContext(UserLocationContext);
  const screenHeight = Dimensions.get("window").height;
  return (
    location?.coords.latitude && (
      <SafeAreaView>
        <StatusBar style="light" backgroundColor="#000" />
        <Animated.View style={[{ backgroundColor: "#000", height: screenHeight }, animatedStyles]}>
          <BackNav path={"/home"} />
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
                  source={require("../../../assets/images/marker.png")}
                  style={{ width: 30, height: 30 }}
                />
              </Marker>
            </MapView>
            
          </View>
        </Animated.View>
      </SafeAreaView>
    )
  );
};

export default page;
