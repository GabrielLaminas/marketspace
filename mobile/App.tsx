import { StatusBar } from "react-native"
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./components/ui/gluestack-ui-provider/config";
import Home from "./src/screens/Home";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </GluestackUIProvider>
  );
}
