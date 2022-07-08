import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import findRoutes from "./appRoutes/findRoutes";
import HomeFeedScreen from "../screens/find/HomeFeedScreen";
import MapViewScreen from "../screens/find/MapViewScreen";
import DatePickerScreen from "../screens/find/DatePickerScreen";
import PeriodScreen from "../screens/find/PeriodScreen";
import TimePickerScreen from "../screens/find/TimePickerScreen";

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
            <Stack.Screen
                name={findRoutes.DATEPICKER_FEED}
                component={DatePickerScreen}
            />
            <Stack.Screen
                name={findRoutes.PERIOD_FEED}
                component={PeriodScreen}
            />
            <Stack.Screen
                name={findRoutes.TIME_FEED}
                component={TimePickerScreen}
            />
        </Stack.Navigator>
    );
};

export default FindStack;
