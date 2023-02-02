import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appRoutes from './appRoutes';
import tabRoutes from './appRoutes/tabRoutes';
import TabsStack from './TabsStack';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import { useDispatch } from 'react-redux';
import { setCurrentLocation } from '../store/actions/currentLocationAction';
import * as Location from 'expo-location';
import Phone from '../screens/register/Phone';
import Avatar from '../screens/register/Avatar';
import { RegisterContext } from '../utils/registerContext';
import { UserCreate } from '../models/states/User';
import MeScreen from '../screens/tabs/MeScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  //Before any navigation, get current position of the user and set it in redux
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        dispatch(setCurrentLocation({ latitude, longitude }));
      }
    })();
  }, []);

  const [user, setUser] = useState<UserCreate | null>(null);

  return (
    <RegisterContext.Provider value={{ user, setUser }}>
      <Stack.Navigator
        // initialRouteName={appRoutes.LOGIN_SCREEN}
        initialRouteName={tabRoutes.ME_SCREEN}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={tabRoutes.ME_SCREEN} component={MeScreen} />
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
};

export default StackNav;
