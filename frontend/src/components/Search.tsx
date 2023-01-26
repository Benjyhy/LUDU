import React from "react";
import { useState } from "react";
import { View } from "react-native"
import { Text, TextInput, Switch } from "react-native-paper";
import findRoutes from "../navigation/appRoutes/findRoutes";
import * as RootNavigation from "../navigation/rootNavigation";
import appRoutes from "../navigation/appRoutes";

const Search = () => {
    const [isMap, setIsMap] = useState(true);
    const routesToDisplaySearchComponent = [findRoutes.HOME_FEED, findRoutes.MAP_VIEW];
    let currentRoute;

    if (RootNavigation.navigationRef.getCurrentRoute()?.name === appRoutes.TAB_NAVIGATOR) {
        currentRoute = findRoutes.HOME_FEED;
    }
    else {
        currentRoute = RootNavigation.navigationRef.getCurrentRoute()?.name as findRoutes;
    }

    const handleToggle = () => {
        setIsMap(!isMap);
        const targetedRoute = isMap
            ? findRoutes.MAP_VIEW
            : findRoutes.HOME_FEED;
        RootNavigation.navigate(targetedRoute, {});
    };

    if (!routesToDisplaySearchComponent.includes(currentRoute)) {
        return null;
    }

    return (
        <View style={{ marginHorizontal: 15, marginTop: 50, marginBottom: 15 }}>
            <Text style={{ fontWeight: "bold", marginTop: 5 }}>Select your address</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TextInput
                    placeholder="Search..."
                    style={{ width: "75%", marginTop: 3 }}
                />
                <Switch onValueChange={handleToggle} value={!isMap} />
            </View>
        </View>
    );
};

export default Search;
