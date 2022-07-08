import React, { useState } from "react";
import {
    Text,
    View,
    NativeBaseProvider,
    Radio,
    HStack,
    Switch,
    FlatList,
    Box,
    VStack,
    Spacer,
    Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { findRoutes } from "../navigation/appRoutes/findRoutes";

function BookingGameComponent() {
    const navigation = useNavigation();
    const [gamePlaces, setGamePlaces] = useState([
        { storeName: "Boutique de Nelly", id: "1", city: "Lille" },
        { storeName: "Store of Jim", id: "2", city: "Paris" },
        { storeName: "Nardisson", id: "3", city: "Yvelines" },
        { storeName: "Directt", id: "4", city: "Roubaix" },
        { storeName: "Play Friendly!!", id: "5", city: "Courbevoie" },
        { storeName: "Boutique du Nord", id: "6", city: "Lomme" },
    ]);
    return (
        <NativeBaseProvider>
            <View alignItems="center">
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
                            <Switch />
                        </HStack>
                    </View>
                    <FlatList
                        data={gamePlaces}
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
export default BookingGameComponent;
