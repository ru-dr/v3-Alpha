import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackNav from "../components/BackNav";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { SwapIcon } from "../components/icons/SwapIcon";

const languageOptions = [
  { value: "Afrikaans", key: "af" },
  { value: "Albanian", key: "sq" },
  { value: "Amharic", key: "am" },
  { value: "Arabic", key: "ar" },
  { value: "Armenian", key: "hy" },
  { value: "Assamese", key: "as" },
  { value: "Aymara", key: "ay" },
  { value: "Azerbaijani", key: "az" },
  { value: "Bambara", key: "bm" },
  { value: "Basque", key: "eu" },
  { value: "Belarusian", key: "be" },
  { value: "Bengali", key: "bn" },
  { value: "Bhojpuri", key: "bho" },
  { value: "Bosnian", key: "bs" },
  { value: "Bulgarian", key: "bg" },
  { value: "Catalan", key: "ca" },
  { value: "Cebuano", key: "ceb" },
  { value: "Chinese (Simplified)", key: "zh-CN" },
  { value: "Chinese (Traditional)", key: "zh-TW" },
  { value: "Corsican", key: "co" },
  { value: "Croatian", key: "hr" },
  { value: "Czech", key: "cs" },
  { value: "Danish", key: "da" },
  { value: "Dhivehi", key: "dv" },
  { value: "Dogri", key: "doi" },
  { value: "Dutch", key: "nl" },
  { value: "English", key: "en" },
  { value: "Esperanto", key: "eo" },
  { value: "Estonian", key: "et" },
  { value: "Ewe", key: "ee" },
  { value: "Filipino (Tagalog)", key: "fil" },
  { value: "Finnish", key: "fi" },
  { value: "French", key: "fr" },
  { value: "Frisian", key: "fy" },
  { value: "Galician", key: "gl" },
  { value: "Georgian", key: "ka" },
  { value: "German", key: "de" },
  { value: "Greek", key: "el" },
  { value: "Guarani", key: "gn" },
  { value: "Gujarati", key: "gu" },
  { value: "Haitian Creole", key: "ht" },
  { value: "Hausa", key: "ha" },
  { value: "Hawaiian", key: "haw" },
  { value: "Hebrew", key: "he" },
  { value: "Hindi", key: "hi" },
  { value: "Hmong", key: "hmn" },
  { value: "Hungarian", key: "hu" },
  { value: "Icelandic", key: "is" },
  { value: "Igbo", key: "ig" },
  { value: "Ilocano", key: "ilo" },
  { value: "Indonesian", key: "id" },
  { value: "Irish", key: "ga" },
  { value: "Italian", key: "it" },
  { value: "Japanese", key: "ja" },
  { value: "Javanese", key: "jv" },
  { value: "Kannada", key: "kn" },
  { value: "Kazakh", key: "kk" },
  { value: "Khmer", key: "km" },
  { value: "Kinyarwanda", key: "rw" },
  { value: "Konkani", key: "gom" },
  { value: "Korean", key: "ko" },
  { value: "Krio", key: "kri" },
  { value: "Kurdish", key: "ku" },
  { value: "Kurdish (Sorani)", key: "ckb" },
  { value: "Kyrgyz", key: "ky" },
  { value: "Lao", key: "lo" },
  { value: "Latin", key: "la" },
  { value: "Latvian", key: "lv" },
  { value: "Lingala", key: "ln" },
  { value: "Lithuanian", key: "lt" },
  { value: "Luganda", key: "lg" },
  { value: "Luxembourgish", key: "lb" },
  { value: "Macedonian", key: "mk" },
  { value: "Maithili", key: "mai" },
  { value: "Malagasy", key: "mg" },
  { value: "Malay", key: "ms" },
  { value: "Malayalam", key: "ml" },
  { value: "Maltese", key: "mt" },
  { value: "Maori", key: "mi" },
  { value: "Marathi", key: "mr" },
  { value: "Meiteilon (Manipuri)", key: "mni-Mtei" },
  { value: "Mizo", key: "lus" },
  { value: "Mongolian", key: "mn" },
  { value: "Myanmar (Burmese)", key: "my" },
  { value: "Nepali", key: "ne" },
  { value: "Norwegian", key: "no" },
  { value: "Nyanja (Chichewa)", key: "ny" },
  { value: "Odia (Oriya)", key: "or" },
  { value: "Oromo", key: "om" },
  { value: "Pashto", key: "ps" },
  { value: "Persian", key: "fa" },
  { value: "Polish", key: "pl" },
  { value: "Portuguese (Portugal, Brazil)", key: "pt" },
  { value: "Punjabi", key: "pa" },
  { value: "Quechua", key: "qu" },
  { value: "Romanian", key: "ro" },
  { value: "Russian", key: "ru" },
  { value: "Samoan", key: "sm" },
  { value: "Sanskrit", key: "sa" },
  { value: "Scots Gaelic", key: "gd" },
  { value: "Sepedi", key: "nso" },
  { value: "Serbian", key: "sr" },
  { value: "Sesotho", key: "st" },
  { value: "Shona", key: "sn" },
  { value: "Sindhi", key: "sd" },
  { value: "Sinhala (Sinhalese)", key: "si" },
  { value: "Slovak", key: "sk" },
  { value: "Slovenian", key: "sl" },
  { value: "Somali", key: "so" },
  { value: "Spanish", key: "es" },
  { value: "Sundanese", key: "su" },
  { value: "Swahili", key: "sw" },
  { value: "Swedish", key: "sv" },
  { value: "Tagalog (Filipino)", key: "tl" },
  { value: "Tajik", key: "tg" },
  { value: "Tamil", key: "ta" },
  { value: "Tatar", key: "tt" },
  { value: "Telugu", key: "te" },
  { value: "Thai", key: "th" },
  { value: "Tigrinya", key: "ti" },
  { value: "Tsonga", key: "ts" },
  { value: "Turkish", key: "tr" },
  { value: "Turkmen", key: "tk" },
  { value: "Twi (Akan)", key: "ak" },
  { value: "Ukrainian", key: "uk" },
  { value: "Urdu", key: "ur" },
  { value: "Uyghur", key: "ug" },
  { value: "Uzbek", key: "uz" },
  { value: "Vietnamese", key: "vi" },
  { value: "Welsh", key: "cy" },
  { value: "Xhosa", key: "xh" },
  { value: "Yiddish", key: "yi" },
  { value: "Yoruba", key: "yo" },
  { value: "Zulu", key: "zu" },
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
        <BackNav path={"/"} />
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
            }}
            placeholder="Enter text to translate"
            onChangeText={(text) => setInputText(text)}
            value={inputText}
          />
          <Button
            title="Translate"
            onPress={translateText}
            disabled={loading}
          />
          {loading ? <ActivityIndicator size="large" color="#00ff00" /> : null}
          <Text style={{ marginTop: 10, fontSize: 16, color: "#ffff" }}>
            Translated Text: {outputText}
          </Text>
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Translate;
