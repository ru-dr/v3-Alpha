import React from "react";
import { Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";


export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const screenHeight = Dimensions.get("window").height;
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#fff", height: screenHeight }}>
        <BackNav path={"/"} />
        <View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
          </View>

          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignInPress}>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
