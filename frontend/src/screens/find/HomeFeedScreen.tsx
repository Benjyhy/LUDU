import React, { useState } from 'react';
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
import { FilterTypes } from '../../models/Filter';
import { useGetLocationByZipCodeQuery } from '../../services/LUDU_API/locations';
import { useGetCopyByIdQuery } from '../../services/LUDU_API/copies';
import { Copy } from '../../models/states/Copy';

const HomeFeedScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const isActiveFilter = useSelector((state: MainAppState) => state.filterGamesByCategories.active);
  const userState = useSelector((state: MainAppState) => state.user);
  const zipCode = useSelector((state: MainAppState) => state.currentLocation.zipCode);
  console.log(zipCode);
  const { data: location, isSuccess } = useGetLocationByZipCodeQuery({ postalCode: zipCode });
  console.log(location);
  const [singleCopies, setSingleCopies] = useState<Array<Copy>>([]);
  if (isSuccess) {
    for (const store in location.stores) {
      for (const copy in store.copies) {
        const { data: singleCopy } = useGetCopyByIdQuery({ _id: copy }, { skip: !isSuccess });
        setSingleCopies(...singleCopies, singleCopy);
      }
    }
  }

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
