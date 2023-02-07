import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import LottieView from 'lottie-react-native';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';

function BookingConfirmationScreen({ route, navigation }: any) {
  const game = route.params.game;
  const animation = useRef(null);
  console.log(route.params);
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
        <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
          Booking confirmation !
        </Text>
        <View>
          <Text variant="titleMedium" style={{ textAlign: 'center' }}>
            Congrats ! You've booked the game{' '}
            <Text style={{ fontStyle: 'italic' }}>{game.gameId.gameName}</Text>!
          </Text>
          <Text style={{ textAlign: 'center' }}>
            You can see your bookings in the{' '}
            <Text style={{ fontWeight: 'bold' }}>booking</Text> tab.
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
          onTouchEnd={() => navigation.navigate(findRoutes.HOME_FEED)}
        >
          Back Home
        </Button>
      </View>
    </Layout>
  );
}

export default BookingConfirmationScreen;
