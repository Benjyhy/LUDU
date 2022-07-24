import React from "react";
import { Input, Switch, Flex, Text } from "native-base";
import { useState } from "react";
import findRoutes from "../navigation/appRoutes/findRoutes";
import * as RootNavigation from "../navigation/rootNavigation";

const Search = () => {
    const [isMap, setIsMap] = useState(true);
    const routesToDisplaySearchComponent = [findRoutes.HOME_FEED, findRoutes.MAP_VIEW];
    let currentRoute;

    if (RootNavigation.navigationRef.isReady())
        currentRoute = RootNavigation.navigationRef.getCurrentRoute()?.name as findRoutes
    else
        currentRoute = findRoutes.HOME_FEED;

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
        <Flex my="5" mx="3">
            <Text fontWeight="bold">Select your address</Text>
            <Flex direction="row" justify="space-between" alignItems="center">
                <Input
                    placeholder="Search..."
                    w="75%"
                    maxWidth="300px"
                    mt="3"
                />
                <Switch onToggle={handleToggle} isChecked={!isMap} colorScheme="orange" />
            </Flex>
        </Flex>
    );
};

export default Search;
