import { Box, ScrollView, VStack, Heading, FlatList, Flex, Text } from "native-base";
import React, { useEffect, useState } from "react";
import homeFeedMockData from "../../mocks/homeFeedMockData";
import GameCard from "../../components/GameCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import Filter from "../../components/Filter";
import { useSelector } from 'react-redux';
import { MainAppState } from "../../models/states";

const HomeFeedScreen = ({ navigation }) => {
    const [isActiveFilter, setIsActiveFilter] = useState(false);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    const currentLocation = useSelector((state: MainAppState) => state.currentLocation);

    useEffect(() => {
        setLocation(currentLocation);
    }, [currentLocation]);

    return (
        <Box>
            <VStack space={2.5} w="100%" px="3">
                <Flex direction="row" justify="space-between">
                    <Heading size="md">Games near you</Heading>
                    <TouchableOpacity
                        onPress={() => setIsActiveFilter(!isActiveFilter)}
                    >
                        <Ionicons name="ios-filter" size={24} color="black" />
                    </TouchableOpacity>
                </Flex>
                <Text>{location.latitude}{location.longitude}</Text>
                <FlatList
                    data={homeFeedMockData}
                    numColumns={2}
                    horizontal={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => <GameCard item={item} navigation={navigation} />}
                />
            </VStack>
            <Filter
                active={isActiveFilter}
                onFilterClick={(value) => setIsActiveFilter(value)}
            />
        </Box>
    );
};

export default HomeFeedScreen;
