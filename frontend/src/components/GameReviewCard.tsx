import React from 'react';
import { Dimensions, View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const GameReviewCard = ({ item }: any) => {
  return (
    <View>
      <View style={[styles.card]}>
        <View>
          <Image
            style={[styles.img]}
            resizeMode="cover"
            source={{
              uri: 'https://via.placeholder.com/150',
            }}
          />
          <Text
            variant="bodyMedium"
            style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}
          >
            {item.name}
          </Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text variant="bodySmall">{item.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GameReviewCard;

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    width: Dimensions.get('window').width - 60,
    marginBottom: 5,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    padding: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: 5,
  },
  colCard: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    width: 75,
    height: 75,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
});
