import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "@context/AuthContext";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { Box } from "@/components/ui/box";
import Loading from "@components/Loading";

export default function Routes() {
  const { user, loading } = useContext(AuthContext);

  if(loading){
    return <Loading />
  }
  
  return (
    <Box className="flex-1">
      <NavigationContainer>
        { user.id ? <AppRoutes /> : <AuthRoutes /> }
      </NavigationContainer>
    </Box>
  );
}
