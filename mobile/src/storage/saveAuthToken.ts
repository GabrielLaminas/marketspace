import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_TOKEN } from "./configStorage";

export default async function saveAuthToken(token: string){
  try {
    await AsyncStorage.setItem(COLLECTION_TOKEN, token);
  } catch (error) {
    throw error;
  }
}