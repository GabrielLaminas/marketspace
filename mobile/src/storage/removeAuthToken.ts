import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_TOKEN } from "./configStorage";

export default async function removeAuthToken(){
  try {
    await AsyncStorage.removeItem(COLLECTION_TOKEN);
  } catch (error) {
    throw error;
  }
}