import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { BackIcon } from "./icons/BackIcon";
import { usePathname } from "expo-router";

const BackNav = ({ path, titleName }) => {
  const pathname = usePathname();
  const title = titleName || pathname.split("/")[1];

  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity>
        <Link href={path} asChild>
          <Pressable>
            <BackIcon />
          </Pressable>
        </Link>
      </TouchableOpacity>
      <Text style={{ color: "#fff", fontFamily: "Syne-Bold", fontSize: 20 }}>
        {title}
      </Text>
    </View>
  );
};

export default BackNav;

const styles = StyleSheet.create({});
