import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import appRoutes from "./appRoutes";
import TabsStack from "./TabsStack";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../store/actions/currentLocationAction";
import * as Location from 'expo-location';

const Stack = createNativeStackNavigator();

const StackNav = () => {
    //Before any navigation, get current position of the user and set it in redux
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync();
                const { latitude, longitude } = location.coords;
                dispatch(setCurrentLocation({ latitude, longitude }));
            }
        })();

    }, []);
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
};

export default StackNav;
