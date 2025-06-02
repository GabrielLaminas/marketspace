import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/User";
import { COLLECTION_USER } from "./configStorage";

export default async function saveUserStorage(user: UserDTO){
  try {
    await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(user));    
  } catch (error) {
    throw error;
  }
}