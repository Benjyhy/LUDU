import React, { useEffect, useState } from 'react';
import findRoutes from '../navigation/appRoutes/findRoutes';
import Tag from './Tag';
import { Dimensions, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useGetCopyByIdQuery } from '../services/LUDU_API/copies';
import { Game } from '../models/states/Game';

const GameCard = ({ item, navigation, size }: any) => {
  const [game, setGame] = useState<Game>();

  const {
    data: copy,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetCopyByIdQuery({ _id: item });

  useEffect(() => {
    if (isSuccess) setGame(copy.game);
  }, [copy]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error loading elements</Text>
      </View>
    );
  }
  if (game) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(findRoutes.GAME_SCREEN, { item })}>
        <View style={[styles.card, size === 'small' ? styles.smallCard : styles.largeCard]}>
          <Image
            style={[size === 'small' ? styles.smallImg : styles.largeImg]}
            resizeMode="cover"
            source={{
              uri: 'https://via.placeholder.com/150',
            }}
          />
          <View style={styles.content}>
            <View style={{ marginBottom: 15 }}>
              <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                {game.name}
              </Text>
              {/* <View style={{ margin: 3, flexDirection: 'row', flexWrap: 'wrap' }}>
              {game.tags.map((tag: string, index: React.Key | null | undefined) => (
                <Tag tagName={tag} key={index} />
              ))}
            </View> */}
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text variant="bodySmall">{game.description}</Text>
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
    borderWidth: 1,
    height: 'auto',
    borderRadius: 5,
    width: '50%',
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
});
