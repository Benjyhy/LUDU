import React from 'react';
import gameData from '../../mocks/gameMockData';
import GameReviewCard from '../../components/GameReviewCard';
import GameCard from '../../components/GameCard';
import { Dimensions } from 'react-native';
import { InlineTextIcon } from '../../components/InlineTextIcon';
import { Button, Divider, Text } from 'react-native-paper';
import { View, ScrollView, Image } from 'react-native';
import Tag from '../../components/Tag';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import { borderRadius, horizontalPadding, primaryColor, secondaryColor } from '../../utils/const';
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
  navigation.setOptions({ title: game.gameName });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
      {/* Display likes reviews and share number*/}
      <View
        style={{ flexDirection: 'row', marginVertical: 16, marginHorizontal: horizontalPadding }}
      >
        <View>
          <InlineTextIcon icon={'star-outline'} text={'22 Likes'} />
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <InlineTextIcon icon={'chatbubbles-outline'} text={'4 Reviews'} />
        </View>
      </View>

      {/* display image, tags, description */}
      <View style={{ paddingRight: horizontalPadding, paddingLeft: horizontalPadding }}>
        <View>
          <Image
            resizeMode="cover"
            style={{
              width: Dimensions.get('window').width - horizontalPadding * 2,
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
            marginVertical: 16,
          }}
        >
          {game.tags.map((tag: string, index) => (
            <Tag tagName={tag} key={index} />
          ))}
          <Text style={{ fontSize: 12 }}>{game.description}</Text>
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
          onPress={() => navigation.navigate(findRoutes.BOOKING_FEED, { game: game })}
          textColor={'white'}
          buttonColor={secondaryColor}
          mode="contained"
          icon="book"
          style={{
            width: 140,
            marginBottom: 8,
            borderRadius: borderRadius,
            paddingHorizontal: 16,
          }}
        >
          Book
        </Button>
        <Button
          onPress={() => navigation.navigate(findRoutes.DELIVERY_FEED, { game: game })}
          textColor={'white'}
          buttonColor={primaryColor}
          mode="contained"
          icon="dice-6"
          style={{
            width: 140,
            marginBottom: 8,
            borderRadius: borderRadius,
            paddingHorizontal: 16,
          }}
        >
          Play now
        </Button>
      </View>
      <Divider style={{ marginVertical: 16 }} />
      {/* render 'they loved playing it' */}
      <View style={{ paddingLeft: horizontalPadding, marginBottom: 16 }}>
        <Text
          variant="headlineMedium"
          style={{
            marginBottom: 4,
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
      <View
        style={{
          marginBottom: 16,
          paddingLeft: horizontalPadding,
        }}
      >
        <Text
          variant="headlineMedium"
          style={{
            marginBottom: 4,
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
            <GameCard item={game} navigation={navigation} size="small" key={game.id} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default GameScreen;
