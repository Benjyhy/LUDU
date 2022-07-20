import React from "react";
import { Input, Switch, Flex, Text } from "native-base";
import { useState } from "react";
import findRoutes from "../navigation/appRoutes/findRoutes";
import * as RootNavigation from "../navigation/rootNavigation";

const Search = () => {
    const [isMap, setIsMap] = useState(true);

    const handleToggle = () => {
        setIsMap(!isMap);
        const targetedRoute = isMap
            ? findRoutes.MAP_VIEW
            : findRoutes.HOME_FEED;
        RootNavigation.navigate(targetedRoute, {});
    };

    return (
        <Flex>
            <Text>Select your address</Text>
            <Flex direction="row" justify="space-between">
                <Input
                    mx="3"
                    placeholder="Search..."
                    w="75%"
                    maxWidth="300px"
                />
                <Switch onToggle={handleToggle} isChecked={!isMap} />
            </Flex>
        </Flex>
    );
};

export default Search;