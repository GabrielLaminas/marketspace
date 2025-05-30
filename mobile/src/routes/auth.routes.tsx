import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";

export type AuthRoutesProps = {
  SignIn: undefined;
  SignUp: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>();

export default function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
