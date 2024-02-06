import {
  Text,
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const page = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "298038507775-035pg828ia1sr9paidn2o63kn5eq4ocv.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response]);

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
    setUserInfo(null);
  };

  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000", height: screenHeight }}>
        <BackNav path={"/home"} />
        <View style={styles.container}>
          {!userInfo ? (
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <Text style={styles.btn}>Login with Google</Text>
            </TouchableOpacity>
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
              <TouchableOpacity onPress={removeLocalUser}>
                <Text style={styles.btn}>Log out</Text>
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: "#000", // Set main background color
  },
  card: {
    backgroundColor: "#1a1a1a", // Darker shade for card
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
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
    color: "#fff", // Set text color to white
  },
  btn: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  centeredView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
