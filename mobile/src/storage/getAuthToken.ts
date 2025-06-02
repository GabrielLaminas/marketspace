import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_TOKEN } from "./configStorage";

export default async function getAuthToken(){
  try {
    const storage = AsyncStorage.getItem(COLLECTION_TOKEN);
    return storage;
  } catch (error) {
    throw error;
  }
}