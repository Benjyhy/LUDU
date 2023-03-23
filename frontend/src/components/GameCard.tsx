import React, { useEffect, useState } from 'react';
import findRoutes from '../navigation/appRoutes/findRoutes';
import Tag from './Tag';
import { Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Game } from '../models/states/Game';
import { useGetGameByIdQuery } from '../services/LUDU_API/games';
import ImageHandle from './Image';

interface IGameCard {
  id: string;
  navigation: any;
  size: string;
}

const GameCard = ({ id, navigation, size }: IGameCard) => {
  const [game, setGame] = useState<Game>();

  const { data: item, isLoading, isError, isSuccess } = useGetGameByIdQuery({ _id: id });

  useEffect(() => {
    if (isSuccess) setGame(item);
  }, [isSuccess]);

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return (
      <View>
        <Text>Error Game Card</Text>
      </View>
    );
  }

  if (game) {
    return (
      <TouchableOpacity onPress={() => navigation.push(findRoutes.GAME_SCREEN, game._id)}>
        <View style={[styles.card, size === 'small' ? styles.smallCard : styles.largeCard]}>
          <ImageHandle src={game.thumbnail} resizeMode={'cover'} size={'small'} height={150} />
          <View style={styles.content}>
            <View style={{ marginBottom: 16 }}>
              <Text
                variant="titleLarge"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ fontWeight: 'bold' }}
              >
                {game.name}
              </Text>
              <View style={{ margin: 2, flexDirection: 'row', flexWrap: 'wrap' }}>
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
            </View>
            <View style={{ marginBottom: 8 }}>
              {size !== 'small' && (
                <Text variant="bodySmall" style={styles.description}>
                  {game.description}
                </Text>
              )}
              {size === 'small' && (
                <Text
                  variant="bodySmall"
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={styles.description}
                >
                  {game.description}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default GameCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    overflow: 'hidden',
    height: 'auto',
    borderRadius: 5,
    width: '50%',
    borderWidth: 1,
  },
  smallCard: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginRight: 15,
    height: 350,
  },
  largeCard: {
    width: 'auto',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 20,
  },
  smallImg: {
    width: '100%',
    height: 150,
  },
  largeImg: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 10,
    margin: 3,
    flex: 1,
    marginLeft: 0,
  },
  description: {
    maxWidth: '100%',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
