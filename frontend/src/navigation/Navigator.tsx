import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { appRoutes } from "./appRoutes";
import TabsStack from "./TabsStack";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

function StackNav() {
    return (
        <Stack.Navigator
            initialRouteName={appRoutes.TAB_NAVIGATOR}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={appRoutes.LOADING_SCREEN}
                component={LoadingScreen}
            />
            <Stack.Screen
                name={appRoutes.LOGIN_SCREEN}
                component={LoginScreen}
            />
            <Stack.Screen
                name={appRoutes.TAB_NAVIGATOR}
                component={TabsStack}
            />
            <Stack.Screen
                name={appRoutes.SIGNUP_SCREEN}
                component={SignUpScreen}
            />
        </Stack.Navigator>
    );
}

export default StackNav;
