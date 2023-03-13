import React from 'react';
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
import { useGetCopiesByZipCodeQuery } from '../../services/LUDU_API/locations';

const HomeFeedScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const isActiveFilter = useSelector((state: MainAppState) => state.filterGamesByCategories.active);
  const userState = useSelector((state: MainAppState) => state.user);
  const zipCode = useSelector((state: MainAppState) => state.currentLocation.zipCode);
  const {
    data: copies,
    isLoading: isLoadingIds,
    isError: isErrorIds,
    isSuccess,
    isFetching,
  } = useGetCopiesByZipCodeQuery({ postalCode: zipCode });

  if (isLoadingIds) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isErrorIds) {
    return (
      <View>
        <Text>Error loading elements</Text>
      </View>
    );
  }

  if (isSuccess && !isFetching) {
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
            {copies.map((item) => (
              <GameCard item={item} navigation={navigation} size="large" key={item} />
            ))}
          </ScrollView>
        </Layout>
        {isActiveFilter ? <Filter filterType={FilterTypes.Category} /> : ''}
      </>
    );
  }
};

export default HomeFeedScreen;
