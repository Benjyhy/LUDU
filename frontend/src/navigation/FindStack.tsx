import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import findRoutes from './appRoutes/findRoutes';
import HomeFeedScreen from '../screens/find/HomeFeedScreen';
import MapViewScreen from '../screens/find/MapViewScreen';
import GameScreen from '../screens/find/GameScreen';
import BookingGameScreen from '../screens/find/BookingGameScreen';
import DatePickerScreen from '../screens/find/DatePickerScreen';
import PeriodScreen from '../screens/find/PeriodScreen';
import BookingConfirmationScreen from '../screens/find/BookingConfirmationScreen';
import StorePickScreen from '../screens/find/StorePickScreen';
import TimePickerScreen from '../screens/find/TimePickerScreen';
import Search from '../components/Search';
const Stack = createNativeStackNavigator();

const FindStack = () => {
  return (
    <Stack.Navigator initialRouteName={findRoutes.HOME_FEED} screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name={findRoutes.HOME_FEED}
        component={HomeFeedScreen}
        options={{
          headerTitle: () => <Search active={false} />,
        }}
      />
      <Stack.Screen
        name={findRoutes.MAP_VIEW}
        component={MapViewScreen}
        options={{
          headerTitle: () => <Search active={true} />,
          headerLeft: () => <></>,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name={findRoutes.GAME_SCREEN} component={GameScreen} />
      <Stack.Screen name={findRoutes.BOOKING_FEED} component={BookingGameScreen} />
      <Stack.Screen name={findRoutes.DATEPICKER_FEED} component={DatePickerScreen} />
      <Stack.Screen name={findRoutes.PERIOD_FEED} component={PeriodScreen} />
      <Stack.Screen name={findRoutes.DELIVERY_FEED} component={StorePickScreen} />
      <Stack.Screen name={findRoutes.BOOKING_CONFIRMATION} component={BookingConfirmationScreen} />
      <Stack.Screen name={findRoutes.TIME_FEED} component={TimePickerScreen} />
    </Stack.Navigator>
  );
};

export default FindStack;
