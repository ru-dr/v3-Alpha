import { View, Text, Dimensions, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { Link } from "expo-router";
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
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <Animated.View style={[{ backgroundColor: "#000", height: screenHeight }, animatedStyles]}>
        <BackNav path={"/home"} titleName={"Profile"} />

        {/* write from here */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Link href={"/auth/login"} asChild>
            <Pressable>
              <Text style={styles.btn}>Google Auth</Text>
            </Pressable>
          </Link>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default page;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
  },
});
