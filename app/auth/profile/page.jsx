import { View, Text, Dimensions, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { Link } from "expo-router";

const page = () => {
  // get current route path

  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000", height: screenHeight }}>
        <BackNav path={"/"} titleName={"Profile"} />

        {/* write from here */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Link href={"../login/page"} asChild>
            <Pressable>
              <Text style={styles.btn}>Google Auth</Text>
            </Pressable>
          </Link>
        </View>
      </View>
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
