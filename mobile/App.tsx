import "./global.css";

import { StatusBar } from "react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import Home from "./src/screens/Home";

export default function App() {
  return (
    <GluestackUIProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </GluestackUIProvider>
  );
}
