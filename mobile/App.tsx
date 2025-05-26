import { StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import "./global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native"

import Loading from "@components/Loading";
import Routes from "@routes/index";

export default function App() {
  const fontsLoaded = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <GluestackUIProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {
        fontsLoaded 
        ? (
          <GestureHandlerRootView>
            <Routes />
          </GestureHandlerRootView>
        ) 
        : <Loading />
      }         
    </GluestackUIProvider>
  );
}
