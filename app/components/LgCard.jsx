import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import { Link } from "expo-router";

const fonts = {
  "Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
};

const styles = StyleSheet.create({
  card: {
    borderColor: "white",
    width: 250,
    height: 90,
    borderRadius: 25,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 90,
  },
  text: {
    fontFamily: "Inter-Light",
    fontSize: 30,
  },
});

const LgCard = ({ txt, color, Icon, path }) => {
  const [fontsLoaded, fontError] = useFonts(fonts);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity>
      <Link href={path} asChild>
        <Pressable>
          <View style={[styles.card, { backgroundColor: color }]}>
            <View style={styles.cardContent}>
              <View>{Icon && <Icon />}</View>
              <View>
                <Text style={styles.text}>{txt}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </TouchableOpacity>
  );
};

export default LgCard;
