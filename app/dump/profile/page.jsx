import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { Link } from "expo-router";

const page = () => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000", height: screenHeight }}>
        <BackNav path={"/"} />
        <View>
          <Text style={{ color: "#fff" }}>Profile</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Link href="../signin/page" asChild>
              <Pressable>
                <Text style={styles.Text}>Sign IN</Text>
              </Pressable>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity>
            <Link href="../signup/page" asChild>
              <Pressable>
                <Text style={styles.Text}>Sign Up</Text>
              </Pressable>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity>
            <Link href="../login/page" asChild>
              <Pressable>
                <Text style={styles.Text}>Log In</Text>
              </Pressable>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default page;

const styles = StyleSheet.create({
  Text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
