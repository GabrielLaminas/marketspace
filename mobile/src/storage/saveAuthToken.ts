import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_TOKEN } from "./configStorage";

export default async function saveAuthToken(token: string, refresh_token: string){
  try {
    await AsyncStorage.setItem(COLLECTION_TOKEN, JSON.stringify({ token, refresh_token }));
  } catch (error) {
    throw error;
  }
}