import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import useAuth from '../hooks/useAuth';

const Stack = createStackNavigator();

export default function StackNavigator() {
    const { user } = useAuth();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                user ?
                    (
                        <>
                            <Stack.Screen name="HomeScreen" component={HomeScreen} />
                        </>
                    ) :
                    (
                        <>
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        </>
                    )
            }



        </Stack.Navigator>
    );
}