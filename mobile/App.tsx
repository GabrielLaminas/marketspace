import { StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import "./global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import Home from "./src/screens/Home";
import Loading from "@components/Loading";
import SignIn from "@screens/SignIn";

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
      {fontsLoaded ? <SignIn /> : <Loading />}
    </GluestackUIProvider>
  );
}
