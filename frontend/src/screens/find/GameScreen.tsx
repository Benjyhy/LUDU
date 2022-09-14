import React from "react";
import {
  Heading,
  ScrollView,
  View,
  Flex,
  Spacer,
  Text,
  Image,
  Box,
  VStack,
} from "native-base";
import { Icon } from "react-native-elements";
import gameData from "../../mocks/gameMockData";
import GameReviewCard from "../../components/GameReviewCard";
import findRoutes from "../../navigation/appRoutes/findRoutes";
import GameCard from "../../components/GameCard";
import { TouchableOpacity } from "react-native";
import { InlineTextIcon } from "../../components/InlineTextIcon";
import { Button } from "../../components/Button";

const GameScreen = ({ route, navigation }: any) => {
  const game = gameData.find((game) => game.id === route.params.item.id);

  if (!game) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Heading size="md">An error occured</Heading>
        </ScrollView>
      </View>
    );
  }
  return (
    <ScrollView>

      {/* display title and button to like review and shares */}
      <Flex mt="1.5" mx="8px" direction="row" alignItems={"center"}>
        <Heading fontSize={26} size="md">
          {game.gameName}
        </Heading>
        <Spacer />
        <Flex direction="row">
          <Box>
            <TouchableOpacity onPress={() => console.log("press like")}>
              <Icon size={24} name="favorite-border" />
            </TouchableOpacity>
          </Box>
          <Box mx={2}>
            <TouchableOpacity onPress={() => console.log("press comment")}>
              <Icon size={24} name="chat-bubble-outline" />
            </TouchableOpacity>
          </Box>
          <Box>
            <TouchableOpacity onPress={() => console.log("press share")}>
              <Icon size={24} name="share" />
            </TouchableOpacity>
          </Box>
        </Flex>
      </Flex>

      {/* Display likes reviews and share number*/}
      <Flex direction="row" mb="2" mx="8px">
        <Box>
          <InlineTextIcon icon={"favorite"} text={"22 Likes"} />
        </Box>
        <Box mx={8}>
          <InlineTextIcon icon={"chat-bubble"} text={"4 Reviews"} />
        </Box>
        <Box>
          <InlineTextIcon icon={"share"} text={"12 Shares"} />
        </Box>
      </Flex>

      {/* display image, tags, description */}
      <Flex direction="row" mb="2" ml="2.5" mr="1">
        <Box>
          <Image
            size={150}
            source={{
              uri: game.gameImgUrl,
            }}
            alt={game.id}
          ></Image>
        </Box>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          mx={4}
        >
          {game.tags.map((tag: string, index) => (
            <Text
              style={{ backgroundColor: "black", color: "white" }}
              paddingLeft="2"
              paddingRight="2"
              borderRadius={20}
              borderWidth={1}
              borderStyle="solid"
              fontSize={14}
              ml="1"
              mr="1"
              mb="1"
              key={index}
            >
              {tag}
            </Text>
          ))}
          <Text ml="1" fontSize={12}>{game.description}</Text>
        </View>
      </Flex>

      {/* render 'play now' and 'book' button */}
      <Flex direction="row" mb="4" width={"100%"} justifyContent={"space-around"}>
        <Button
          icon={"event"}
          onPress={(() => console.log("Play now"))}
          text={"Play now"}
        />
        <Button
          icon={"event"}
          onPress={(() => console.log("Book"))}
          text={"Book"}
        />
      </Flex>

      {/* render 'they loved playing it' */}
      <Heading mt="3" mb="2" ml="1">
        They loved playing it
      </Heading>
      <ScrollView horizontal>
        {game.reviews.map((review, index) => (
          <GameReviewCard review={review} key={index} />
        ))}
      </ScrollView>

      {/* render 'game alike' */}
      <Heading mt="3" mb="2" ml="1">
        Game alike
      </Heading>
      <ScrollView horizontal>
        {gameData.map((game: any, index) => <GameCard item={game} navigation={navigation} direction="row" key={game.id} />)}
      </ScrollView>

    </ScrollView>
  );
};

export default GameScreen;
