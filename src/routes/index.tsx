import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import { useAuth } from '../contexts/auth';

const Stack = createNativeStackNavigator();

export default function Routes() {
    const { signed } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {signed ? (
                    <Stack.Screen name="Home" component={Home} />
                ) : (
                    // Temporary placeholder if signed is false (not expected in bypass mode)
                    <Stack.Screen name="Home" component={Home} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
