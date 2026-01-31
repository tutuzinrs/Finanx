import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import AddTransaction from "../screens/AddTransaction";
import Login from "../screens/Login";
import { useAuth } from "../contexts/auth";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { signed } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
