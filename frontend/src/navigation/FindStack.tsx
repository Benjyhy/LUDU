import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import findRoutes from "./appRoutes/findRoutes";
import HomeFeedScreen from "../screens/find/HomeFeedScreen";
import MapViewScreen from "../screens/find/MapViewScreen";
import GameScreen from "../screens/find/GameScreen";

const Stack = createNativeStackNavigator();

const FindStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={findRoutes.HOME_FEED}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={findRoutes.HOME_FEED}
                component={HomeFeedScreen}
            />
            <Stack.Screen
                name={findRoutes.MAP_VIEW}
                component={MapViewScreen}
            />
            <Stack.Screen
                name={findRoutes.GAME_SCREEN}
                component={GameScreen}
            />
        </Stack.Navigator>
    );
};

export default FindStack;
