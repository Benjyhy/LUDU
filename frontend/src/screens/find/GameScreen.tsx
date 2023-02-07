import React from 'react';
import gameData from '../../mocks/gameMockData';
import GameReviewCard from '../../components/GameReviewCard';
import GameCard from '../../components/GameCard';
import { Dimensions, TouchableOpacity } from 'react-native';
import { InlineTextIcon } from '../../components/InlineTextIcon';
import { Button, Divider, Text } from 'react-native-paper';
import { View, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Tag from '../../components/Tag';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import {
  horizontalPadding,
  primaryColor,
  secondaryColor,
} from '../../utils/const';
import Layout from '../Layout';

const GameScreen = ({ route, navigation }: any) => {
  const game = gameData.find((game) => game.id === route.params.item.id);
  console.log(route.params.item);
  if (!game) {
    return (
      <View style={{ flex: 1 }}>
        <Text variant="bodyMedium">An error occured</Text>
      </View>
    );
  }
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* display title and button to like review and shares */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: horizontalPadding,
          }}
        >
          <Text
            variant="headlineMedium"
            style={{
              fontWeight: 'bold',
            }}
          >
            {game.gameName}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <TouchableOpacity onPress={() => console.log('press like')}>
                <Ionicons size={24} name="star" />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 2 }}>
              <TouchableOpacity onPress={() => console.log('press comment')}>
                <Ionicons size={24} name="chatbubbles" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => console.log('press share')}>
                <Ionicons size={24} name="share" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Display likes reviews and share number*/}
        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
          <View>
            <InlineTextIcon icon={'star'} text={'22 Likes'} />
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <InlineTextIcon icon={'chatbubbles'} text={'4 Reviews'} />
          </View>
          <View>
            <InlineTextIcon icon={'share'} text={'12 Shares'} />
          </View>
        </View>

        {/* display image, tags, description */}
        <View>
          <View>
            <Image
              resizeMode="cover"
              style={{
                width: Dimensions.get('window').width,
                height: 150,
              }}
              source={{
                uri: 'https://via.placeholder.com/150',
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginVertical: 15,
            }}
          >
            {game.tags.map((tag: string, index) => (
              <Tag tagName={tag} key={index} />
            ))}
            <Text style={{ marginLeft: 1, fontSize: 12 }}>
              {game.description}
            </Text>
          </View>
        </View>

        {/* render 'play now' and 'book' button */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 4,
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Button
            onPress={() =>
              navigation.navigate(findRoutes.BOOKING_FEED, { game: game })
            }
            textColor={'white'}
            buttonColor={secondaryColor}
            mode="contained"
            icon="book"
          >
            Book
          </Button>
          <Button
            onPress={() =>
              navigation.navigate(findRoutes.DELIVERY_FEED, { game: game })
            }
            textColor={'white'}
            buttonColor={primaryColor}
            icon="dice-6"
            mode="contained"
          >
            Play now
          </Button>
        </View>
        <Divider style={{ marginVertical: 15 }} />
        {/* render 'they loved playing it' */}
        <View style={{ marginVertical: 20 }}>
          <Text
            variant="headlineMedium"
            style={{
              marginTop: 3,
              marginBottom: 2,
              marginLeft: 1,
              fontWeight: 'bold',
            }}
          >
            They loved playing it
          </Text>
          <ScrollView
            contentContainerStyle={{
              paddingRight: horizontalPadding,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: -horizontalPadding, y: 0 }}
            style={{
              overflow: 'visible',
              width: Dimensions.get('window').width,
            }}
          >
            {game.reviews.map((review, index) => (
              <GameReviewCard item={review} key={index} />
            ))}
          </ScrollView>
        </View>

        {/* render 'game alike' */}
        <View>
          <Text
            variant="headlineMedium"
            style={{
              marginTop: 3,
              marginBottom: 2,
              marginLeft: 1,
              fontWeight: 'bold',
            }}
          >
            Game alike
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: horizontalPadding,
            }}
            horizontal
            contentOffset={{ x: -horizontalPadding, y: 0 }}
            style={{
              overflow: 'visible',
              width: Dimensions.get('window').width,
            }}
          >
            {gameData.map((game: any, index) => (
              <GameCard
                item={game}
                navigation={navigation}
                size="small"
                key={game.id}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default GameScreen;
