import React from "react";
import { AspectRatio, Box, Heading, HStack, Image, Stack, Text } from "native-base";
import findRoutes from "../navigation/appRoutes/findRoutes";


const GameCard = ({ item, navigation }: any) => {
    return (
        <Box
            alignItems="center"
            marginBottom={5}
            onTouchEnd={() => navigation.navigate(findRoutes.GAME_SCREEN, { item })}
        >
            <Box w="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                            uri: item.gameImgUrl
                        }} alt="image" />
                    </AspectRatio>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="sm" ml="-1">
                            {item.gameName}
                        </Heading>
                        <HStack space={3}>
                            {item.tags.map((tag: string, index: React.Key | null | undefined) =>
                                <Text
                                    color="orange.500"
                                    w="auto"
                                    borderRadius={3}
                                    borderColor="orange.500"
                                    borderWidth={1}
                                    fontSize={14}
                                    fontWeight="bold"
                                    px="5"
                                    py="1"
                                    key={index}
                                >
                                    {tag}
                                </Text>
                            )}
                        </HStack>
                    </Stack>
                    <Text fontWeight="400">
                        {item.description}
                    </Text>
                </Stack>
            </Box>
        </Box>
    );
};

export default GameCard;
