import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../components/BackNav";

export default class App extends React.Component {
  state = {
    phoneNumbers: [],
  };

  componentDidMount() {
    fetch("https://pols-aagyi-pols.vercel.app/contact/Testing")
      .then((response) => response.json())
      .then((data) => {
        const phoneNumbers = [
          data["Contact Number ( pri )"],
          data["Contact Number ( sec )"],
          data["Contact Number ( tri )"],
        ];
        this.setState({ phoneNumbers });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  dialCall = (phoneNumber) => {
    let dialNumber;
    if (Platform.OS === "android") {
      dialNumber = `tel:${phoneNumber}`;
    } else {
      dialNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(dialNumber);
  };

  render() {
    const { phoneNumbers } = this.state;
    const screenHeight = Dimensions.get("window").height;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="#000" />
        <View style={{ backgroundColor: "#000" }}>
          <BackNav path={"/"} />
        </View>
        <View style={styles.mainContainer}>
          {phoneNumbers.map((phoneNumber, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.dialCall(phoneNumber)}
              activeOpacity={0.7}
              style={styles.button}
            >
              <Text style={styles.textStyle}>CALL {phoneNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  button: {
    width: "80%",
    padding: 6,
    backgroundColor: "#4130E6",
    borderRadius: 7,
    marginTop: 20,
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});