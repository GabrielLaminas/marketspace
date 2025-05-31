import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "@context/AuthContext";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { Box } from "@/components/ui/box";

export default function Routes() {
  const { user } = useContext(AuthContext);

  return (
    <Box className="flex-1">
      <NavigationContainer>
        { user.id ? <AppRoutes /> : <AuthRoutes /> }
      </NavigationContainer>
    </Box>
  );
}
