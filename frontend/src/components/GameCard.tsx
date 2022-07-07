import React from "react";
import { Center, Image, Text } from "native-base";
import { Dimensions } from "react-native";

const GameCard = ({ item }) => {
    const width = Dimensions.get("window").width - 60;
    return (
        <Center
            w={width / 2}
            borderRadius="4px"
            bg="white"
            _text={{
                color: "coolGray.800",
            }}
            marginBottom="15px"
        >
            <Image
                size={150}
                source={{
                    uri: item.gameImgUrl,
                }}
            ></Image>
            <Text>{item.gameName}</Text>
            <Text>{item.rating}</Text>
        </Center>
    );
};

export default GameCard;
