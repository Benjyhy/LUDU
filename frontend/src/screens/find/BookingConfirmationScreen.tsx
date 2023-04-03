import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';
import moment from 'moment';
import tabRoutes from '../../navigation/appRoutes/tabRoutes';

function BookingConfirmationScreen({ route, navigation }: any) {
  const game = route.params.game;
  const store = route.params.store;
  const result = route.params.response;
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <Layout>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          paddingVertical: 70,
          height: '100%',
        }}
      >
        <Text variant="headlineMedium" style={{ fontWeight: 'bold', textAlign: 'center' }}>
          Booking confirmation !
        </Text>
        <View>
          <Text variant="titleMedium" style={{ textAlign: 'center' }}>
            Congrats ! You've booked the game{' '}
            <Text style={{ fontStyle: 'italic' }}>{game.name}</Text> at{' '}
            <Text style={{ fontWeight: 'bold' }}>{store.name}</Text> for{' '}
            <Text style={{ fontStyle: 'italic' }}>
              {moment(result.startDate).utc().format('dddd, MMMM Do YYYY [at] hh:mm a')}.
            </Text>
          </Text>
          <Text style={{ marginTop: 40, fontSize: 15, fontStyle: 'italic' }}>
            Delivery Mode: {result.type}
          </Text>
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            You can see your bookings in the <Text style={{ fontWeight: 'bold' }}>booking</Text>{' '}
            tab.
          </Text>
        </View>
        <LottieView
          autoPlay
          loop={false}
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'transparent',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../../../assets/confirmation-animation.json')}
        />
        <Button
          style={{ borderRadius: 5 }}
          buttonColor={primaryColor}
          textColor="white"
          onTouchEnd={() => navigation.navigate(tabRoutes.BOOKING_TABS_SCREEN)}
        >
          See your bookings
        </Button>
      </View>
    </Layout>
  );
}

export default BookingConfirmationScreen;
