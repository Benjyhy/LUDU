import React, { useEffect, useState } from 'react';
import homeFeedMockData from '../../mocks/homeFeedMockData';
import GameCard from '../../components/GameCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import Filter from '../../components/Filter';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import {
  horizontalHeaderPadding,
  primaryColor,
  verticalHeaderPadding,
} from '../../utils/const';
import filters from '../../mocks/filterMockData';
import Layout from '../Layout';

const HomeFeedScreen = ({ navigation }: any) => {
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const currentLocation = useSelector(
    (state: MainAppState) => state.currentLocation,
  );
  const [checked, setChecked] = useState<string[]>(['test']);
  const userState = useSelector((state: MainAppState) => state.user);
  console.log(userState);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  return (
    <ScrollView
      style={{
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      <Layout>
        <>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              variant="headlineMedium"
              style={{ fontWeight: 'bold', marginBottom: 15 }}
            >
              Games near you
            </Text>
            <TouchableOpacity
              onPress={() => setIsActiveFilter(!isActiveFilter)}
            >
              <Ionicons name="funnel" size={24} color={primaryColor} />
            </TouchableOpacity>
          </View>
          {homeFeedMockData.map((item) => (
            <GameCard
              item={item}
              navigation={navigation}
              size="large"
              key={item.id}
            />
          ))}

          <Filter
            filters={filters}
            active={isActiveFilter}
            onFilterClick={(value) => setIsActiveFilter(value)}
            checked={checked}
            setChecked={setChecked}
          />
        </>
      </Layout>
    </ScrollView>
  );
};

export default HomeFeedScreen;
