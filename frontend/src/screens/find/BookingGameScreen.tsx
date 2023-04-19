import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import StoreListing from '../../components/StoreListing';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { useGetEntitiesByZipCodeQuery } from '../../services/LUDU_API/locations';
import { useFocusEffect } from '@react-navigation/native';

function BookingGameScreen({ route, navigation }: any) {
  const item = route.params.game;
  const zipCode = useSelector((state: MainAppState) => state.currentLocation.zipCode);
  const {
    data,
    isSuccess,
    refetch: refetchGames,
  } = useGetEntitiesByZipCodeQuery(
    {
      postalCode: zipCode,
      entity: 'stores',
    },
    { refetchOnFocus: true, refetchOnReconnect: true },
  );

  const [stores, setStores] = React.useState([]);

  useFocusEffect(
    useCallback(() => {
      refetchGames();
    }, [refetchGames]),
  );

  const filterStore = (store) => {
    return store.copies.find((copy) => copy.convertedGameId === item._id && copy.available);
  };

  const gamePlaces = stores.filter((store) => filterStore(store));

  React.useEffect(() => {
    if (isSuccess) {
      setStores(data);
    }
  }, [isSuccess]);

  const [selectedStore, setSelected] = useState(null);
  const selectStore = (it) => {
    setSelected(it);
  };

  const handleNavigation = () => {
    if (selectedStore) {
      navigation.navigate(findRoutes.DATEPICKER_FEED, {
        selectedStore: selectedStore,
        game: item,
      });
    } else {
      return '';
    }
  };

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
            Booking for {item.name}
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
            <StoreListing selectedStore={selectStore} items={gamePlaces} />
          </ScrollView>
        </View>
        <Button
          buttonColor={primaryColor}
          textColor="white"
          style={{ borderRadius: 5, width: 'auto' }}
          onPress={() => handleNavigation()}
        >
          Continue
        </Button>
      </View>
    </Layout>
  );
}

export default BookingGameScreen;
