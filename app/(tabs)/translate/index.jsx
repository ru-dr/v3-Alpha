import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { SwapIcon } from "../../components/icons/SwapIcon";

const languageOptions = [
  { key: "en", value: "English" },
  { key: "es", value: "Spanish" },
  { key: "fr", value: "French" },
  { key: "hi", value: "Hindi" },
  { key: "bn", value: "Bengali" },
  { key: "te", value: "Telugu" },
  { key: "mr", value: "Marathi" },
  { key: "ta", value: "Tamil" },
  { key: "ur", value: "Urdu" },
  { key: "gu", value: "Gujarati" },
  { key: "kn", value: "Kannada" },
  { key: "ml", value: "Malayalam" },
  { key: "or", value: "Odia" },
  { key: "pa", value: "Punjabi" },
  { key: "as", value: "Assamese" },
  { key: "ks", value: "Kashmiri" },
  { key: "sd", value: "Sindhi" },
  { key: "ne", value: "Nepali " },
  { key: "si", value: "Sinhala" },
  { key: "my", value: "Burmese" },
  { key: "dz", value: "Dzongkha" },
  { key: "ka", value: "Georgian" },
  { key: "bo", value: "Tibetan" },
  { key: "mn", value: "Mongolian" },
  { key: "lo", value: "Lao" },
  { key: "km", value: "Khmer" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  { key: "vi", value: "Vietnamese" },
  { key: "ms", value: "Malay" },
  { key: "id", value: "Indonesian" },
  { key: "jv", value: "Javanese" },
  { key: "su", value: "Sundanese" },
  { key: "tl", value: "Tagalog" },
  { key: "hmn", value: "Hmong" },
  { key: "zh", value: "Chinese" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "th", value: "Thai" },
  { key: "my", value: "Burmese" },
  // Add more language options as needed
];

const Translate = () => {
  const screenHeight = Dimensions.get("window").height;
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("es");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateText = async () => {
    setLoading(true);
    setError("");
    try {
      console.log(fromLanguage, toLanguage, inputText);
      const response = await axios.get(
        `https://langapi.vercel.app/v2?text=${encodeURIComponent(
          inputText
        )}&from=${fromLanguage}&to=${toLanguage}`
      );
      console.log(response.data);
      setOutputText(response.data.data.result);
    } catch (error) {
      setError("Error translating text");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={{ backgroundColor: "#000", height: screenHeight }}>
        <BackNav path={"/home"} />
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SelectList
            boxStyles={{ backgroundColor: "#fff", width: 150 }}
            itemStyle={{ backgroundColor: "#fff" }}
            dropdownItemStyles={{ backgroundColor: "#fff", width: 150 }}
            dropdownStyles={{ backgroundColor: "#fff", width: 150 }}
            dropdownTextStyles={{ color: "#000" }}
            setSelected={(item) => setFromLanguage(item)}
            data={languageOptions}
            save="key"
            placeholder="From"
          />
          <SwapIcon />
          <SelectList
            boxStyles={{ backgroundColor: "#fff", width: 150 }}
            itemStyle={{ backgroundColor: "#fff" }}
            dropdownItemStyles={{ backgroundColor: "#fff", width: 150 }}
            dropdownStyles={{ backgroundColor: "#fff", width: 150 }}
            dropdownTextStyles={{ color: "#000" }}
            setSelected={(item) => setToLanguage(item)}
            data={languageOptions}
            save="key"
            placeholder="To"
          />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ffff",
              padding: 10,
              borderRadius: 10,
              color: "#fff",
              height: 200,
            }}
            placeholder="Enter text to translate"
            placeholderTextColor={"#fff"}
            multiline={true}
            textAlignVertical={"top"}
            textAlign={"left"}
            onChangeText={(text) => setInputText(text)}
            value={inputText}
          />
          <Pressable onPress={translateText}>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#fcba03",
                borderRadius: 10,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                borderWidth: 1,
                borderColor: "#ffff",
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontFamily: "Syne-Bold",
                  }}
                  onPress={translateText}
                >
                  Translate
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
          {loading ? <ActivityIndicator size="large" color="#00ff00" /> : null}
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ffff",
              padding: 10,
              borderRadius: 10,
              color: "#fff",
              height: 200,
              marginVertical: 10,
              textAlignVertical: "top",
              textAlign: "left",
            }}
            value={outputText}
            placeholder="Translated text"
            placeholderTextColor={"#fff"}
            multiline={true}
            editable={false}
          />
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Translate;
