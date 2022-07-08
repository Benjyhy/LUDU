import { Box, ScrollView, VStack, Heading, FlatList } from "native-base";
import React from "react";
import homeFeedMockData from "../../mocks/homeFeedMockData";
import GameCard from "../../components/GameCard";

const HomeFeedScreen = () => {
    return (
        <Box>
            <VStack space={2.5} w="100%" px="3">
                <Heading size="md">Games near you</Heading>
                <FlatList
                    data={homeFeedMockData}
                    numColumns={2}
                    horizontal={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => <GameCard item={item} />}
                />
            </VStack>
        </Box>
    );
};

export default HomeFeedScreen;
