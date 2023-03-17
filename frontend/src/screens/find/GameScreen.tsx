import React, { useEffect } from 'react';
import gameData from '../../mocks/gameMockData';
import GameReviewCard from '../../components/GameReviewCard';
import GameCard from '../../components/GameCard';
import { ActivityIndicator, Dimensions } from 'react-native';
import { InlineTextIcon } from '../../components/InlineTextIcon';
import { Button, Divider, Text } from 'react-native-paper';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Tag from '../../components/Tag';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import {
  borderRadius,
  errorColor,
  getGameImg,
  horizontalPadding,
  primaryColor,
  secondaryColor,
} from '../../utils/const';
import { useGetGameByIdQuery, useRandomGameQuery } from '../../services/LUDU_API/games';
import RatingsStars from '../../components/RatingsStars';
import { Game } from '../../models/states/Game';

const Reviews = ({ reviews }: { reviews: string[] }) => {
  return (
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
        {reviews.map((review: string, index: number) => (
          <GameReviewCard reviewId={review} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const Suggestion = ({ navigation }: any) => {
  const { data: games, isLoading, isSuccess, isError, error } = useRandomGameQuery();
  return (
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
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color={primaryColor} />
        </View>
      )}
      {isSuccess && (
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
          {games.map((game: Game, index: number) => (
            <GameCard
              id={game._id}
              navigation={navigation}
              size="small"
              isGame={true}
              key={index}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const GameScreen = ({ route, navigation }: any) => {
  const {
    data: game,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGameByIdQuery({ _id: route.params });

  useEffect(() => {
    navigation.setOptions({ title: '' });
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigation.setOptions({ title: game.name });
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color={primaryColor} />
        </View>
      )}
      {isError && (
        <View style={styles.center}>
          <Text variant="headlineSmall" style={{ color: errorColor }}>
            Game not found
          </Text>
          <Button
            onPress={() => navigation.navigate(findRoutes.HOME_FEED)}
            buttonColor={primaryColor}
            textColor="white"
            style={{
              borderRadius: borderRadius,
              marginHorizontal: 16,
              marginVertical: 12,
            }}
          >
            Back
          </Button>
        </View>
      )}
      {isSuccess && game && (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
          {/* Display likes reviews and share number*/}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 16,
              marginHorizontal: horizontalPadding,
            }}
          >
            <InlineTextIcon icon={'star-outline'} text={`${game.likes} Likes`} />
            <View style={{ marginHorizontal: 8 }}>
              <InlineTextIcon
                icon={'chatbubbles-outline'}
                text={`${game.reviews.length} Reviews`}
              />
            </View>
          </View>

          {/* display image, tags, description */}
          <View style={{ paddingRight: horizontalPadding, paddingLeft: horizontalPadding }}>
            <View>
              <Image
                resizeMode="cover"
                style={{
                  width: Dimensions.get('window').width - horizontalPadding * 2,
                  height: 400,
                }}
                source={{
                  uri: getGameImg(game.thumbnail),
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 8,
                }}
              >
                {Object.values(game.tags).map(
                  (tag: string, index: React.Key | null | undefined) => (
                    <Tag
                      tagValue={tag}
                      tagName={Object.keys(game.tags).find((key) => game.tags[key] === tag)}
                      key={index}
                    />
                  ),
                )}
              </View>

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

          <Reviews reviews={game.reviews} />

          {/* render 'game alike' */}
          <Suggestion navigation={navigation} />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameScreen;
