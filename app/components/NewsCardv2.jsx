import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from "react-native";
import axios from "axios";

const truncateWords = (text, numWords) => {
  // Check if text is null or undefined
  if (!text) {
    return "";
  }

  const words = text.split(" ");
  if (words.length > numWords) {
    return `${words.slice(0, numWords).join(" ")}...`;
  }
  return text;
};


const NewsCard = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);


//   other api provider with 48 hrs latest news ( newsdata.io )
  const fetchNews = async () => {
    try {
      const apiKey = "pub_30952e678e7e6e656b0bae237e8846ce63a9b";
      const apiUrl = "https://newsdata.io/api/1/news";
      const queryString = "travel safety";
      const language = "en";
      const category = "tourism,world";

      const options = {
        method: "GET",
        url: `${apiUrl}?apikey=${apiKey}&q=${encodeURIComponent(queryString)}&language=${language}&category=${encodeURIComponent(category)}`,
      };

      const response = await axios.request(options);
      const articles = response.data.results.slice(0, 10);
      setNews(articles);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  const handleRefresh = () => {
    fetchNews();
  };

  return (
    <ScrollView style={{ marginBottom: 450 }}>
      {news.map((article, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(article.link)}>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ marginRight: 10 }}>
              {article.image_url ? (
                <Image
                  style={{ width: 140, height: 100, borderRadius: 10 }}
                  source={{ uri: article.image_url }}
                />
              ) : (
                <Image
                  style={{ width: 140, height: 100, borderRadius: 10 }}
                  source={{
                    uri: "https://tenor.com/view/loading-gif-20660982",
                  }}
                />
              )}
            </View>
            <View style={{ flex: 1, justifyContent: "space-between", rowGap: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  width: "100%",
                  fontFamily: "Inter-SemiBold",
                }}
                numberOfLines={2}
              >
                {truncateWords(article.title, 10)}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  width: "100%",
                  fontFamily: "Inter-Light",
                }}
              >
                {truncateWords(article.description, 15)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NewsCard;
