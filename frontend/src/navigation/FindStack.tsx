import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import findRoutes from "./appRoutes/findRoutes";
import HomeFeedScreen from "../screens/find/HomeFeedScreen";
import MapViewScreen from "../screens/find/MapViewScreen";

const Stack = createNativeStackNavigator();

const FindStack = () => {
    return (
        <Stack.Navigator initialRouteName={findRoutes.HOME_FEED}>
            <Stack.Screen
                name={findRoutes.HOME_FEED}
                component={HomeFeedScreen}
            />
            <Stack.Screen
                name={findRoutes.MAP_VIEW}
                component={MapViewScreen}
            />
        </Stack.Navigator>
    );
};

export default FindStack;
