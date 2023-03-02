import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import storeMockData from '../../mocks/storeMockData';
import StoreListing from '../../components/StoreListing';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';

function BookingGameScreen({ route, navigation }: any) {
  const item = route.params.game;
  const gamePlaces = storeMockData;
  console.log(item);
  const game = gamePlaces.find((game) => game.gameId.id === item.id);
  const gameName = game.gameId.gameName;
  const items = gamePlaces.filter((game) => game.gameId.id === item.id);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [selected, setSelected] = useState(null);
  const selectedGame = (it) => {
    setSelected(it);
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <Layout>
      <View
        style={{
          height: '100%',
          justifyContent: 'space-between',
          paddingVertical: 70,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text variant="headlineMedium" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Booking for {gameName}
          </Text>
          <Text variant="titleSmall" style={{ textAlign: 'center' }}>
            Game stores based on your current location
          </Text>
        </View>
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Choose your game store :
          </Text>
          <ScrollView style={{ paddingVertical: 20, height: 300 }}>
            <StoreListing selectedGame={selectedGame} items={items} />
          </ScrollView>
        </View>
        <Button
          buttonColor={primaryColor}
          textColor="white"
          style={{ borderRadius: 5, width: 'auto' }}
          onTouchEnd={() => navigation.navigate(findRoutes.DATEPICKER_FEED, { game: selected })}
        >
          Continue
        </Button>
      </View>
    </Layout>
  );
}

export default BookingGameScreen;
