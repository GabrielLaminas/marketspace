import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_USER } from "./configStorage";
import { UserDTO } from "@dtos/User";

export default async function getUserStorage(){
  try {
    const storage = await AsyncStorage.getItem(COLLECTION_USER);
    const data: UserDTO = storage ? JSON.parse(storage) : null;
    return data;
  } catch (error) {
    throw error;
  }
}