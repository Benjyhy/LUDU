import React from "react";
import { View, AspectRatio, Box, Flex, Heading, HStack, Image, Stack, Text } from "native-base";
import findRoutes from "../navigation/appRoutes/findRoutes";
import { Dimensions } from 'react-native';

const GameReviewCard = ({item, navigation, direction}: any) => {
    return (
        <Flex
            alignItems={direction === 'row' ? 'flex-start' : 'center'}
            width={Dimensions.get('window').width - 30}
            marginBottom={5}
            marginRight={5}
            onTouchEnd={() => navigation.navigate(findRoutes.GAME_SCREEN, { item })}
            direction={direction}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }}
            _web={{
                shadow: 2,
                borderWidth: 0
            }}
            _light={{
                backgroundColor: "gray.50"
            }}
        >
            <Box>
                <AspectRatio
                    width={direction === 'row' ? 'auto' : '100%'}
                    height={direction === 'row' ? '100%' : 'auto'}
                    ratio={{
                        base: direction === 'row' ? 9 / 16 : 16 / 9,
                        md: 9 / 10
                    }}
                >
                    <Image resizeMode="cover" source={{
                        uri: item.avatar
                    }} alt="image" />
                </AspectRatio>
            </Box>
            <Stack p="4" space={3} flex={1}>
                <Stack space={2}>
                    <Heading size="sm" ml="-1">
                        {item.name}
                    </Heading>
                    {/* <View style={{alignItems:'center'}}>
                        <StarReview />
                    </View> */}
                </Stack>
                <Box>
                    <Text fontWeight="400">
                        {item.description}
                    </Text>
                </Box>
            </Stack>
        </Flex>
    );

};

export default GameReviewCard;
