import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text, RadioButton, Switch, Button } from 'react-native-paper';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import storeMockData from '../../mocks/storeMockData';
import StoreListing from '../../components/StoreListing';
import { primaryColor } from '../../utils/const';

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
    <View
      style={{
        height: '100%',
        justifyContent: 'space-between',
        paddingVertical: 70,
        paddingHorizontal: 15,
      }}
    >
      <View>
        <Text
          variant="headlineMedium"
          style={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          Booking for {gameName}
        </Text>
        <Text variant="titleSmall" style={{ textAlign: 'center' }}>
          Game stores based on your current location
        </Text>
      </View>
      <View>
        <Text
          variant="headlineSmall"
          style={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          Choose your game store :
        </Text>
        <SafeAreaView>
          <ScrollView style={{ paddingVertical: 20, height: 300 }}>
            <StoreListing selectedGame={selectedGame} items={items} />
          </ScrollView>
        </SafeAreaView>
      </View>
      <Button
        buttonColor={primaryColor}
        textColor="white"
        style={{ borderRadius: 5, width: 'auto' }}
        onTouchEnd={() =>
          navigation.navigate(findRoutes.DATEPICKER_FEED, { game: selected })
        }
      >
        Continue
      </Button>
    </View>
  );
}

export default BookingGameScreen;
