import React from "react";
import { Heading, ScrollView, View, Flex, Spacer, Text, Image, Box, Button } from "native-base";
import { Icon } from 'react-native-elements'
import gameData from '../../mocks/gameMockData'
import GameReviewCard from "../../components/GameReviewCard";
import GameAlikeCard from "../../components/GameAlikeCard";
import findRoutes from "../../navigation/appRoutes/findRoutes";
import {useNavigation} from "@react-navigation/native";

const GameScreen = (props: any) => {
    const game = gameData.find(game => game.id === props.route.params.item.id)

    if (!game) {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView >
                    <Heading size="md">An error occured</Heading>
                </ScrollView>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }} mt="10">
            <ScrollView>
                {/* display title and button to like review and shares */}
                <Flex direction="row" mt="1.5">
                    <Heading fontSize={26} ml='2%' size="md">{game.name}</Heading>
                    <Spacer />
                    <Flex direction='row'>
                        <Icon tvParallaxProperties size={30} name="favorite-border" onPress={() => console.log('press like')} />
                        <Icon tvParallaxProperties size={30} name="chat-bubble-outline" onPress={() => console.log('press comment')} />
                        <Icon tvParallaxProperties size={30} name="share" onPress={() => console.log('press share')} />
                    </Flex>
                </Flex>

                {/* Display likes reviews and share number*/}
                <Flex direction="row" mt='2' ml="2" >
                    <Text fontSize={15}>
                        <Icon tvParallaxProperties size={15} name="favorite" />
                        {' '}
                        {game.likes} likes
                    </Text>
                    <Text ml="5" fontSize={15}>
                        <Icon tvParallaxProperties size={15} name="chat-bubble" />
                        {' '}
                        {game.reviews.length} reviews
                    </Text>
                    <Text ml="5" fontSize={15}>
                        <Icon tvParallaxProperties size={15} name="share" />
                        {' '}
                        {game.shares} shares
                    </Text>
                </Flex>

                {/* display image, tags, description */}
                <Flex direction="row" mt="3" ml="2.5" mr="1">
                    <Box>
                        <Image
                            size={150}
                            source={{
                                uri: game.thumbnail,
                            }}
                            alt={game.id}
                        ></Image>
                    </Box>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap",
                    }}>
                        {game.tags.map((tag: string, index) =>
                            <Text
                                style={{ backgroundColor: "black", color: 'white' }}
                                paddingLeft="2"
                                paddingRight="2"
                                borderRadius={20}
                                borderWidth={1}
                                borderStyle='solid'
                                fontSize={18}
                                ml="1"
                                mr="1"
                                mb="1"
                                key={index}
                            >
                                {tag}
                            </Text>
                        )}
                        <Text ml="1">{game.description}</Text>
                    </View>
                </Flex>

                {/* render 'play now' and 'book' button */}
                <Flex direction="row" mt="3">
                    <Button
                        ml="12"
                        width="35%"
                        backgroundColor="white"
                        borderRadius="20"
                        borderStyle="solid"
                        borderWidth="2"
                        onTouchEnd={() => console.log('Play now')}
                    >
                        <Flex direction="row">
                            <Text fontSize={18}>
                                <Icon tvParallaxProperties size={18} name="event" />
                                Play now
                            </Text>
                        </Flex>
                    </Button>
                    <Spacer />
                    <Button
                        mr="12"
                        width="35%"
                        backgroundColor="white"
                        borderRadius="20"
                        borderStyle="solid"
                        borderWidth="2"
                        onTouchEnd={() => props.navigation.navigate(findRoutes.BOOKING_FEED, { game: game })}
                    >
                        <Flex direction="row">
                            <Text fontSize={18}>
                                <Icon tvParallaxProperties size={18} name="event" />
                                Book
                            </Text>
                        </Flex>
                    </Button>
                </Flex>

                {/* render 'they loved playing it' */}
                <Heading mt="3" mb="2" ml="1">They loved playing it</Heading>
                <ScrollView horizontal>
                    {game.reviews.map((review, index) => <GameReviewCard review={review} key={index} />)}
                </ScrollView>

                {/* render 'game alike' */}
                <Heading mt="3" mb="2" ml="1">Game alike</Heading>
                <ScrollView horizontal>
                    {gameData.map((game: any, index) => <GameAlikeCard game={game} key={index} />)}
                </ScrollView>
            </ScrollView>
        </View>
    )
};

export default GameScreen;
