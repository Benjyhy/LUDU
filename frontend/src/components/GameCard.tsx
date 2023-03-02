import React from 'react';
import findRoutes from '../navigation/appRoutes/findRoutes';
import Tag from './Tag';
import { Dimensions, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const GameCard = ({ item, navigation, size }: any) => {
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
              {item.gameName}
            </Text>
            <View style={{ margin: 3, flexDirection: 'row', flexWrap: 'wrap' }}>
              {item.tags.map((tag: string, index: React.Key | null | undefined) => (
                <Tag tagName={tag} key={index} />
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 8 }}>
            <Text variant="bodySmall">{item.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
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
