import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import axios from "axios";

const truncateWords = (text, numWords) => {
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

  const fetchNews = async () => {
    try {
      const apiKey = "30a7f133922d4cb4a1d89c10fdd4759d"; // Replace with your News API key
      const apiUrl = "https://newsapi.org/v2/";
      const queryString = "travel safety";
      const type = "everything";
      const sorting = "popularity";
      const options = {
        method: "GET",
        url: `${apiUrl}${type}?q=${queryString}&sortBy=${sorting}&apiKey=${apiKey}`,
        language: "en",
      };

      const response = await axios.request(options);
      const articles = response.data.articles.slice(0, 10);
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
      {news.slice(0, 30).map((article, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(article.url)}>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ marginRight: 10 }}>
              {article.urlToImage ? (
                <Image
                  style={{ width: 140, height: 100, borderRadius: 10 }}
                  source={{ uri: article.urlToImage }}
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
            <View
              style={{ flex: 1, justifyContent: "space-between", rowGap: 10 }}
            >
              <Text
                style={{
                  color: "#fff", // Adjusted color for better visibility
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
