import React from "react";
import { Text, View, ScrollView } from "react-native";
import NewsCard from "./NewsCard";

const News = () => {
  return (
    <View>
      {/* Wrap the below Text tags in View */}
      <Text
        style={{ fontFamily: "Syne-Bold", color: "#fff", fontSize: 25 }}
      >
        News
      </Text>
      <Text style={{ fontFamily: "Inter-Light", color: "#fff" }}>
        Top Headlines
      </Text>
      <View style={{ borderRadius: 20 }}></View>
      <ScrollView style={{ marginTop: 2 }}>
        <NewsCard />
        {/* The below code inserts a blank card */}
        <View
          style={{ height: 50, width: 100, backgroundColor: "white" }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default News;
