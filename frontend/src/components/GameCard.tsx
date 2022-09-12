import React from "react";
import { AspectRatio, Box, Heading, HStack, Stack, Image, Text } from "native-base";
import findRoutes from "../navigation/appRoutes/findRoutes";
import Tag from "./Tag";
import  Picture from "./Image"


const GameCard = ({ item, navigation }: any) => {
    console.log({lol: item})
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
                    <AspectRatio ratio={ 16 / 9}>
                        {/* <Image source={{
                            uri: item.gameImgUrl
                        }} 
                        alt="image" /> */}
                    <Picture width={120} height={80} source={item.gameImgUrl} />
                    </AspectRatio>

                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="sm" ml="-1">
                            {item.gameName}
                        </Heading>
                        <HStack space={3}>
                            {item.tags.map((tag: string, index: React.Key | null | undefined) =>
                                <Tag tagName={tag} key={index} />
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
