import { View, Text, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { useEffect, useState } from "react";
import { StyleSheet, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const page = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "298038507775-q9kodv8e1nsc9ldqdg0m03ajg9fl3dqb.apps.googleusercontent.com",
    // iosClientId: "",
    // webClientId: "",
  });

  // get default redirect url
  

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  };

  const removeLocalUser = async () => {
    await AsyncStorage.removeItem("@user");
  };

  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000", height: screenHeight }}>
        <BackNav path={"/"} />
        <View style={styles.container}>
          {!userInfo ? (
            <Button
              title="Sign in with Google"
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            />
          ) : (
            <View style={styles.card}>
              {userInfo?.picture && (
                <Image
                  source={{ uri: userInfo?.picture }}
                  style={styles.image}
                />
              )}
              <Text style={styles.text}>Email: {userInfo.email}</Text>
              <Text style={styles.text}>
                Verified: {userInfo.verified_email ? "yes" : "no"}
              </Text>
              <Text style={styles.text}>Name: {userInfo.name}</Text>
              {/* <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text> */}
            </View>
          )}
          <Button title="remove local store" onPress={removeLocalUser()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"#000"
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
