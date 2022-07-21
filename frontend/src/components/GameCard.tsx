import React from "react";
import { Center, Image, Text } from "native-base";
import { Dimensions } from "react-native";
import * as RootNavigation from "../navigation/rootNavigation";


const GameCard = ({ item }: any) => {
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
                onTouchStart={() => RootNavigation.navigate('game', {item})}
            >
                <Image
                    size={150}
                    source={{
                        uri: item.gameImgUrl,
                    }}
                    alt={item.id}
                ></Image>
                <Text>{item.gameName}</Text>
                <Text>{item.rating}</Text>
            </Center>
    );
};

export default GameCard;
