import React from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Text, Avatar, Card, Title } from 'react-native-paper';
import { lowGray, primaryColor } from '../../utils/const';
const LeftContent = (image) => <Avatar.Image size={60} source={image} />;

const rightContent = (status) => (
  <Text style={status === 'inprogress' ? styles.inprogress : styles.finished}>
    {status}
  </Text>
);

const CardItem = ({ item }) => {
  return (
    <Card
      style={styles.cardStyle}
      mode={item.status === 'inprogress' ? 'elevated' : 'contained'}
    >
      <Card.Title
        title={item.gameName}
        titleStyle={styles.title}
        subtitle={item.storeName}
        subtitleStyle={styles.subtitle}
        left={() => LeftContent(item.gameImgUrl)}
        right={() => rightContent(item.status)}
      />
      <Card.Content style={styles.content}>
        <Title>
          <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Delivery:
          </Text>{' '}
          {item.bookingType}
        </Title>
        <Text style={styles.text}>
          Booked at {moment(item.startDate).format('LLLL')}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 170,
    backgroundColor: lowGray,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 20,
  },
  content: {
    marginTop: 20,
  },
  cardStyle: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 170,
    backgroundColor: lowGray,
  },
  text: {
    marginTop: 10,
  },
  inprogress: {
    color: 'green',
    marginRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle: 'italic',
  },
  finished: {
    color: primaryColor,
    marginRight: 10,
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default CardItem;
