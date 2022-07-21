import React from "react";
import { View, Flex, Text, Image } from "native-base";

const GameAlikeCard = ({game}: any) => {

    return (
        <Flex direction="row" mt="3" ml="2.5" mr="1" borderWidth="2" borderStyle="solid">
            <Flex direction="column" alignItems="center">
                <Image
                    size={150}
                    source={{
                        uri: game.thumbnail,
                    }}
                    alt={game.id}
                ></Image>
                <Text fontSize={18}>{game.name}</Text>
            </Flex>
            <View width="220" mt="3">
                <Text ml="1">{game.description}</Text>
            </View>
        </Flex>
    )
};

export default GameAlikeCard;
