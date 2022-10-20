import React, { useEffect, createContext, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import appRoutes from "./appRoutes";
import TabsStack from "./TabsStack";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
<<<<<<< HEAD
import SignUpScreen from "../screens/SignUpScreen";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../store/actions/currentLocationAction";
import * as Location from 'expo-location';
=======
import RegisterScreen from "../screens/register/RegisterScreen";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../store/actions/currentLocationAction";
import * as Location from "expo-location";
import Phone from "../screens/register/Phone";
import Avatar from "../screens/register/Avatar";
import { User } from "../models/states/User";

const RegisterContext = createContext<User | null>(null);
>>>>>>> 0b329ef (updating gitignore + setting up model)

const Stack = createNativeStackNavigator();

const StackNav = () => {
<<<<<<< HEAD
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
            initialRouteName={appRoutes.LOGIN_SCREEN}
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
=======
  //Before any navigation, get current position of the user and set it in redux
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        dispatch(setCurrentLocation({ latitude, longitude }));
      }
    })();
  }, []);
  return (
    <RegisterContext.Provider value={null}>
      <Stack.Navigator
        initialRouteName={appRoutes.LOGIN_SCREEN}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={appRoutes.LOADING_SCREEN}
          component={LoadingScreen}
        />
        <Stack.Screen name={appRoutes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen
          name={appRoutes.REGISTER_SCREEN}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={appRoutes.REGISTER_PHONE_SCREEN}
          component={Phone}
        />
        <Stack.Screen
          name={appRoutes.REGISTER_AVATAR_SCREEN}
          component={Avatar}
        />
        <Stack.Screen name={appRoutes.TAB_NAVIGATOR} component={TabsStack} />
      </Stack.Navigator>
    </RegisterContext.Provider>
  );
>>>>>>> 0b329ef (updating gitignore + setting up model)
};

export default StackNav;
