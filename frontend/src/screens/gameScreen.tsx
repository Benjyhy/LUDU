import React from "react";
import { Heading, ScrollView, View, Flex, Spacer, Text, Image, Box } from "native-base";
import { Icon } from 'react-native-elements'
import gameData from '../mocks/gameMockData'

const GameScreen = (props: any) => {
    const game = gameData.find(game => game.id === props.route.params.item.id)
    if(!game) {
        return (
            <View style={{flex: 1}}>
            <ScrollView >
                <Heading size="md">An error occured</Heading>           
            </ScrollView>
        </View>
        )
    }
    return (
        <View style={{flex: 1}}>
            <ScrollView >
                {/* display title and button to like review and shares */}
                <Flex direction="row" mt="1.5">
                    <Heading fontSize={26} ml='2%' size="md">{game.name}</Heading>
                    <Spacer />
                    <Flex direction='row'>
                        <Icon tvParallaxProperties size={30} name="favorite-border" onPress={() => console.log('press like')} ></Icon>
                        <Icon tvParallaxProperties size={30} name="chat-bubble-outline" onPress={() => console.log('press comment')} ></Icon>
                        <Icon tvParallaxProperties size={30} name="share" onPress={() => console.log('press share')} ></Icon>
                    </Flex>
                </Flex>

                {/* Display likes reviews and share number*/}
                <Flex direction="row" mt='2' ml="2" >
                    <Text fontSize={15}>
                        <Icon tvParallaxProperties size={15} name="favorite"></Icon>
                        {' '}
                        {game.likes} likes
                    </Text>
                    <Text ml="5" fontSize={15}>
                    <Icon tvParallaxProperties size={15} name="chat-bubble" ></Icon>
                        {' '}
                        x reviews
                    </Text>
                    <Text ml="5"  fontSize={15}>
                        <Icon tvParallaxProperties size={15} name="share"></Icon>
                        {' '}
                        x shares
                    </Text>
                </Flex>
                
                {/* display image, tags, description */}
                <Flex direction="row" mt="2" ml="2.5">
                    <Box borderStyle='solid' borderWidth="2">
                        <Image
                            size={150}
                            source={{
                                uri: game.thumbnail,
                            }}
                            alt={game.id}
                        ></Image>
                    </Box>
                    <View style={{display: 'flex'}}>
                        {game.tags.map((tag:string) =>
                            <Text>{tag}</Text>
                        )}
                    </View>
                </Flex>
                
            </ScrollView>
        </View>
    )
};

export default GameScreen;
