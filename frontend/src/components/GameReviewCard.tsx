import React from "react";
import { View, Flex, Text } from "native-base";
import { Icon } from 'react-native-elements'

const GameReviewCard = ({review}: any) => {

    return (
        <Flex direction="row" mt="3" ml="2.5" mr="1" borderWidth="2" borderStyle="solid">
            <Flex direction="column" alignItems="center">
                <Icon tvParallaxProperties size={100} name="people-outline" />
                <Text fontSize={18}>{review.name}</Text>
            </Flex>
            <View width="220" mt="3">
                <Text ml="1">{review.description}</Text>
            </View>
        </Flex>
    )
};

export default GameReviewCard;
