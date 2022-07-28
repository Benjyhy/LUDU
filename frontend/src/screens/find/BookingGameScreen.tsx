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
    Image
} from "native-base";
import { findRoutes } from "../../navigation/appRoutes/findRoutes";
import storeMockData from "../../mocks/storeMockData";


function BookingGameScreen({ route, navigation }) {
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
        <NativeBaseProvider>
            <View alignItems="center">
                <View display="flex" flexDirection="row" padding={20}><Text backgroundColor="#F5F5F5" fontWeight="bold" fontSize={20}>Booking for {game.gameId.gameName}</Text></View>
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
                    <FlatList
                        data={items}
                        renderItem={({ item }) => (
                            <Box
                                borderBottomWidth="1"
                                _dark={{
                                    borderColor: "gray.600",
                                }}
                                borderColor="coolGray.200"
                                py="6"
                            >
                                <HStack
                                    space={3}
                                    justifyContent="space-between"
                                >
                                    {/* <Avatar
                                    size="48px"
                                    source={{
                                        uri: item.avatarUrl,
                                    }}
                                /> */}
                                    <VStack>
                                        <Text
                                            _dark={{
                                                color: "warmGray.50",
                                            }}
                                            color="coolGray.800"
                                            bold
                                        >
                                            {item.storeName}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                        >
                                            {item.city}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                </HStack>
                            </Box>
                        )}
                        keyExtractor={item => item.id}
                    />
                    <Button
                        size="md"
                        background="#545454"
                        alignContent="center"
                        marginY={6}
                        borderRadius={5}
                        onPress={() =>
                            navigation.navigate(findRoutes.DATEPICKER_FEED)
                        }
                    >
                        Continue
                    </Button>
                </VStack>
            </View>
        </NativeBaseProvider>
    );
}

export default BookingGameScreen;
