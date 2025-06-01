import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserSignInDTO } from "@dtos/User";
import { COLLECTION_USER } from "./configStorage";

export default async function saveUserStorage(data: UserSignInDTO){
  try {
    await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(data));    
  } catch (error) {
    throw error;
  }
}