import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../Layout';
import CardItem from './Card';
import { Text, Button } from 'react-native-paper';
import { borderRadius, primaryColor } from '../../utils/const';
import findRoutes from '../../navigation/appRoutes/findRoutes';

const RentAction = ({ route, navigation }) => {
  const { rent } = route.params;
  const isOngoingRent = rent.deliveryDate;
  return (
    <Layout>
      <View style={styles.wrapper}>
        <CardItem rent={rent} isAction={false} />
        <View style={styles.containerAction}>
          {isOngoingRent && (
            <Text style={styles.question}>
              Does the game has been <Text style={{ fontWeight: 'bold' }}>return</Text> the game ?{' '}
            </Text>
          )}
          {!isOngoingRent && (
            <Text style={styles.question}>
              Does the games has been <Text style={{ fontWeight: 'bold' }}>deliver</Text> ?
            </Text>
          )}
        </View>
        <Button
          buttonColor={primaryColor}
          textColor="white"
          style={{ borderRadius: borderRadius, width: 'auto' }}
          onTouchEnd={() => navigation.navigate(findRoutes.BOOKING_CONFIRMATION)}
        >
          Confirm
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
  containerAction: {
    marginTop: 20,
    marginBottom: 40,
  },
  question: {
    textAlign: 'center',
    fontSize: 22,
  },
});

export default RentAction;
