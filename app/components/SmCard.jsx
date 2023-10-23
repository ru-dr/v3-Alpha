import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const SmCard = ({ Icon, color, path }) => {
  return (
    <TouchableOpacity>
      <Link href={path} asChild>
        <Pressable>
          <View
            style={{
              backgroundColor: color,
              borderColor: "white",
              width: 110,
              height: 90,
              borderRadius: 25,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 90,
              }}
            >
              <View>{Icon && <Icon />}</View>
            </View>
          </View>
        </Pressable>
      </Link>
    </TouchableOpacity>
  );
};

export default SmCard;
