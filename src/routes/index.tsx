import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import AddTransaction from "../screens/AddTransaction";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import { useAuth } from "../contexts/auth";

import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/"), "finax://"],
  config: {
    screens: {
      Login: "login",
      ForgotPassword: "forgot-password",
      ResetPassword: "reset-password",
    },
  },
};

export default function Routes() {
  const { signed } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
