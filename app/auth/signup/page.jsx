import { View, Text, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { useSignUp } from "@clerk/clerk-expo";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router"

const page = () => {
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height;
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      console.log("Sign up complete.")
      router.replace("/");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#fff", height: screenHeight }}>
        <BackNav path={"/"} />
        <View>
          {!pendingVerification && (
            <View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  value={firstName}
                  placeholder="First Name..."
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
              </View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  value={lastName}
                  placeholder="Last Name..."
                  onChangeText={(lastName) => setLastName(lastName)}
                />
              </View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Email..."
                  onChangeText={(email) => setEmailAddress(email)}
                />
              </View>

              <View>
                <TextInput
                  value={password}
                  placeholder="Password..."
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>

              <TouchableOpacity onPress={onSignUpPress}>
                <Text>Sign up</Text>
              </TouchableOpacity>
            </View>
          )}
          {pendingVerification && (
            <View>
              <View>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                />
              </View>
              <TouchableOpacity onPress={onPressVerify}>
                <Text>Verify Email</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default page;
