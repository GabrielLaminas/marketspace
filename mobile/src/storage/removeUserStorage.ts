import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_USER } from "./configStorage";

export default async function(){
  try {
    await AsyncStorage.removeItem(COLLECTION_USER);
  } catch (error) {
    throw error;
  }
}