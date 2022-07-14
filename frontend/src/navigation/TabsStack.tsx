import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabRoutes from "./appRoutes/tabRoutes";
import FindScreen from "../screens/tabs/FindScreen";
import OrganizeScreen from "../screens/tabs/OrganizeScreen";
import PlayScreen from "../screens/tabs/PlayScreen";
import MeScreen from "../screens/tabs/MeScreen";

const Tab = createBottomTabNavigator();

const TabsStack = () => {
    return (
        <Tab.Navigator>
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
