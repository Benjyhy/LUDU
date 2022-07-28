import React, {useState} from "react";
import {
    Box,
    Button,
    FlatList,
    HStack,
    NativeBaseProvider,
    Radio,
    Spacer,
    Switch,
    Text,
    View,
    VStack,
    Image, Flex, ScrollView
} from "native-base";
import { findRoutes } from "../../navigation/appRoutes/findRoutes";
import storeMockData from "../../mocks/storeMockData";
import StoreListing from "../../components/StoreListing";


function BookingGameScreen({ route, navigation }: any) {
    const item = route.params.game;
    const gamePlaces = storeMockData;

    const game = gamePlaces.find(game => game.gameId.id === item.id)
    const items = gamePlaces.filter(game => game.gameId.id === item.id)

    // const storeId = items.find(store => store.id === game.id)
    // const getBackgroundColor = () => {
    //     let color;
    //     if (storeId) {
    //         color = "#545454";
    //     } else {
    //         color = "";
    //     }
    //     return color;
    // };
    return (
        <ScrollView>
            <View display="flex" alignItems="center" padding={20} backgroundColor="orange.500" borderWidth={3} borderColor="#545454" borderRadius={5} borderStyle="solid">
                <Text fontWeight="bold" fontSize={20} color="white">
                    Booking for {game.gameId.gameName}
                </Text>
            </View>
            <Flex alignItems="center">
                <VStack display="flex" flexDirection="column" marginTop={10}>
                    <Radio.Group
                        name="exampleGroup"
                        accessibilityLabel="select an option"
                    >
                        <Radio value="location">
                            Game stores based on your current location
                        </Radio>
                    </Radio.Group>
                    <Text marginLeft={8} fontWeight={700} fontSize={17}>
                        Your Address
                    </Text>
                    <View
                        display="flex"
                        flexDirection="row"
                        marginTop={8}
                        justifyContent="space-between"
                    >
                        <Text fontWeight={700} fontSize={14} mt={1}>
                            Choose your game store
                        </Text>
                        <HStack alignItems="center">
                            <Text>Map view</Text>
                            <Switch colorScheme="orange" />
                        </HStack>
                    </View>
                    <ScrollView>
                        {items.map(item => <StoreListing item={item} key={item.id} />)}
                        <Button
                            size="md"
                            background="#545454"
                            alignContent="center"
                            marginY={10}
                            borderRadius={5}
                            onTouchEnd={() => navigation.navigate(findRoutes.DATEPICKER_FEED)}
                        >
                            Continue
                        </Button>
                    </ScrollView>
                </VStack>
            </Flex>
        </ScrollView>
    );
}

export default BookingGameScreen;
