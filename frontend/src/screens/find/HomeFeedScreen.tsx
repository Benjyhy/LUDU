import React, { useEffect, useState } from 'react';
import homeFeedMockData from '../../mocks/homeFeedMockData';
import GameCard from '../../components/GameCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';
import { toggleCategoryFilter } from '../../store/actions/filterGamesByCategoriesAction';
import Filter from '../../components/Filter';
import { Categories } from '../../models/states/Category';
import { FilterTypes } from '../../models/Filter';

const HomeFeedScreen = ({ navigation }: any) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const dispatch = useDispatch();
  const currentLocation = useSelector((state: MainAppState) => state.currentLocation);
  const isActiveFilter = useSelector((state: MainAppState) => state.filterGamesByCategories.active);
  const userState = useSelector((state: MainAppState) => state.user);
  console.log(userState);
  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);
  return (
    <>
      <Layout>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 15 }}>
              Games near you
            </Text>
            <TouchableOpacity onPress={() => dispatch(toggleCategoryFilter())}>
              <Ionicons name="funnel" size={24} color={primaryColor} />
            </TouchableOpacity>
          </View>
          {homeFeedMockData.map((item) => (
            <GameCard item={item} navigation={navigation} size="large" key={item.id} />
          ))}
        </ScrollView>
      </Layout>
      {isActiveFilter ? <Filter filterType={FilterTypes.Category} /> : ''}
    </>
  );
};

export default HomeFeedScreen;
