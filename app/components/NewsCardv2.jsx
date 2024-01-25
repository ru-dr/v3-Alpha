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

  const fetchNews = async () => {
    try {
      const options = {
        method: "GET",
        url: "https://api.newscatcherapi.com/v2/search?",
        params: {
          q: "travel safety OR weather OR covid OR tourism",
          lang: "en",
          sort_by: "relevancy",
          page: "1",
          // add trusted sources ( international only ) here
          // sources: ("bbc.co.uk", "cnn.com", "nytimes.com", "washingtonpost.com")
        },
        headers: {
          "x-api-key": "KNYKNyVwCPOB-hdJPcNtPTwhL8UD9ZX2zv1d5ov2M30",
        },
      };

      const response = await axios.request(options);
      // console.log(response.data); // Add this line

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
      {news.map((article, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(article.link)}>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ marginRight: 10 }}>
              {article.media ? (
                <Image
                  style={{ width: 140, height: 100, borderRadius: 10 }}
                  source={{ uri: article.media }}
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
              style={{ flex: 1, justifyContent: "space-between", rowGap: 0 }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  width: "100%",
                  fontFamily: "Inter-SemiBold",
                }}
                numberOfLines={3}
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
                numberOfLines={2}
                lineBreakMode="clip"
              >
                {truncateWords(article.summary, 11)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NewsCard;
