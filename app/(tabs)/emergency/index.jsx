import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { UserLocationContext } from "../../context/UserLocationContext";

export default function App() {
  const { location } = useContext(UserLocationContext);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA3wfl35CzCuXjk1wCkz64hZawNYyWjHDg`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const city = data?.results[0]?.address_components[3].long_name;
          console.log(city);
          return fetch(`https://pols-aagyi-pols.vercel.app/contact/${city}`);
        })
        .then((response) => response.json())
        .then((data) => {
          const phoneNumbers = [
            data["Contact Number ( pri )"],
            data["Contact Number ( sec )"],
            data["Contact Number ( tri )"],
          ];
          setPhoneNumbers(phoneNumbers);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [location]);

  const dialCall = (phoneNumber) => {
    let dialNumber;
    if (Platform.OS === "android") {
      dialNumber = `tel:${phoneNumber}`;
    } else {
      dialNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(dialNumber);
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000" }}>
        <BackNav path={"/home"} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.mainContainer}>
          {phoneNumbers.map((phoneNumber, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => dialCall(phoneNumber)}
              activeOpacity={0.7}
              style={styles.button}
            >
              <Text style={styles.textStyle}>CALL {phoneNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
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
