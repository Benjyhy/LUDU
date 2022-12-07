import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabRoutes from "./appRoutes/tabRoutes";
import FindScreen from "../screens/tabs/FindScreen";
import OrganizeScreen from "../screens/tabs/OrganizeScreen";
import PlayScreen from "../screens/tabs/PlayScreen";
import MeScreen from "../screens/tabs/MeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
    ionIconsName: keyof typeof Ionicons.glyphMap;
}

const Tab = createBottomTabNavigator();

const TabsStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: Props["ionIconsName"];

                    switch (route.name) {

                        case tabRoutes.FIND_SCREEN:
                            iconName = focused
                                ? 'location'
                                : 'location-outline';
                            break;

                        case tabRoutes.PLAY_SCREEN:
                            iconName = focused
                                ? 'ios-game-controller'
                                : 'ios-game-controller-outline';
                            break;

                        case tabRoutes.ORGANIZE_SCREEN:
                            iconName = focused
                                ? 'ios-today'
                                : 'ios-today-outline';
                            break;

                        case tabRoutes.ME_SCREEN:
                            iconName = focused
                                ? 'ios-person'
                                : 'ios-person-outline';
                            break;

                        default:
                            iconName = "location"

                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name={tabRoutes.FIND_SCREEN} component={FindScreen} />
            <Tab.Screen
                name={tabRoutes.ORGANIZE_SCREEN}
                component={OrganizeScreen}
            />
            <Tab.Screen name={tabRoutes.PLAY_SCREEN} component={PlayScreen} />
            <Tab.Screen name={tabRoutes.ME_SCREEN} component={MeScreen} />
        </Tab.Navigator>
    );
};

export default TabsStack;
