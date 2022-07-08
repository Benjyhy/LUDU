import { Box, ScrollView, VStack, Heading, FlatList, Flex } from "native-base";
import React from "react";
import homeFeedMockData from "../../mocks/homeFeedMockData";
import GameCard from "../../components/GameCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import Filter from "../../components/Filter";
import { useState } from "react";

const HomeFeedScreen = () => {
    const [isActiveFilter, setIsActiveFilter] = useState(false);
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
                <FlatList
                    data={homeFeedMockData}
                    numColumns={2}
                    horizontal={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => <GameCard item={item} />}
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
