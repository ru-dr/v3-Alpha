import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function OAuthRedirect() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRedirect(true);
    }, 50000);

    // Fetch user data from AsyncStorage
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("@user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    fetchUser();

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);

  if (shouldRedirect) {
    return <Redirect href="/home" />;
  }

  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000", height: screenHeight }}>
        {/* <BackNav path={"/home"} /> */}
        <View style={styles.container}>
          {user ? (
            <Text style={styles.successText}>User is authenticated</Text>
          ) : (
            <Text style={styles.loadingText}>
              Checking authentication status...
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// add modern styling for dark mode

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  successText: {
    color: "green",
    fontSize: 25,
    fontFamily: "Syne-Bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  loadingText: {
    color: "#fc6c",
    fontSize: 12,
    fontFamily: "Syne-Bold",
    textAlign: "center",

  },
});
