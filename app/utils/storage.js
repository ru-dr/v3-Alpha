import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocalUser = async () => {
  const data = await AsyncStorage.getItem("@user");
  if (!data) return null;
  console.log(JSON.parse(data));
  return JSON.parse(data);
};
