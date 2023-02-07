import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabRoutes from './appRoutes/tabRoutes';
import FindScreen from '../screens/tabs/FindScreen';
import PlayScreen from '../screens/tabs/PlayScreen';
import MeScreen from '../screens/tabs/MeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { primaryColor } from '../utils/const';
import BookingTabsScreen from '../screens/tabs/BookingScreen';
import Filter from '../components/Filter';

type Props = {
  ionIconsName: keyof typeof Ionicons.glyphMap;
};

const Tab = createBottomTabNavigator();

const TabsStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: Props['ionIconsName'];

          switch (route.name) {
            case tabRoutes.FIND_SCREEN:
              iconName = focused ? 'location' : 'location-outline';
              break;

            case tabRoutes.PLAY_SCREEN:
              iconName = focused
                ? 'ios-game-controller'
                : 'ios-game-controller-outline';
              break;

            case tabRoutes.BOOKING_TABS_SCREEN:
              iconName = focused ? 'ios-today' : 'ios-today-outline';
              break;

            case tabRoutes.ME_SCREEN:
              iconName = focused ? 'ios-person' : 'ios-person-outline';
              break;

            default:
              iconName = 'location';
          }

          return <Ionicons name={iconName} size={size} color={primaryColor} />;
        },
        headerShown: true,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name={tabRoutes.FIND_SCREEN} component={FindScreen} />
      <Tab.Screen
        name={tabRoutes.BOOKING_TABS_SCREEN}
        component={BookingTabsScreen}
        options={{
          headerRight: () => (
            <Filter filters={['DELIVERED', 'INPROGRESS']} key={'status'} />
          ),
        }}
      />
      <Tab.Screen name={tabRoutes.PLAY_SCREEN} component={PlayScreen} />
      <Tab.Screen name={tabRoutes.ME_SCREEN} component={MeScreen} />
    </Tab.Navigator>
  );
};

export default TabsStack;
