import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_TOKEN } from "./configStorage";

type StorageAuthTokenProps = {
  token: string; 
  refresh_token: string;
}

export default async function getAuthToken(){
  try {
    const response = await AsyncStorage.getItem(COLLECTION_TOKEN);
    const { token, refresh_token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};
    return { token, refresh_token };
  } catch (error) {
    throw error;
  }
}