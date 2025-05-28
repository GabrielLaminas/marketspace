import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { Box } from "@/components/ui/box";

export default function Routes() {
  const user = false;

  return (
    <Box className="flex-1">
      <NavigationContainer>
        { user ? <AppRoutes /> : <AuthRoutes /> }
      </NavigationContainer>
    </Box>
  );
}
