import React, { useEffect } from 'react';
import GameCard from '../../components/GameCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { borderRadius, primaryColor } from '../../utils/const';
import Layout from '../Layout';
import { toggleCategoryFilter } from '../../store/actions/filterGamesByCategoriesAction';
import Filter from '../../components/Filter';
import { FilterTypes } from '../../models/Filter';
import { useGetEntitiesByZipCodeQuery } from '../../services/LUDU_API/locations';
import NotFound from '../../components/NotFound';
import appRoutes from '../../navigation/appRoutes';

const HomeFeedScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const isActiveFilter = useSelector((state: MainAppState) => state.filterGamesByCategories.active);
  const zipCode = useSelector((state: MainAppState) => state.currentLocation.zipCode);
  const {
    data: copies,
    isLoading: isLoading,
    isError: isError,
    isSuccess,
    isFetching,
  } = useGetEntitiesByZipCodeQuery({ postalCode: zipCode, entity: 'copies' });

  useEffect(() => {
    if (isError) {
      navigation.setOptions({ headerShown: false });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigation.setOptions({ headerShown: false });
    }
  }, [isSuccess]);

  if (isSuccess && !isFetching) {
    return (
      <>
        {isLoading && (
          <View style={styles.center}>
            <ActivityIndicator animating={true} size="large" color={primaryColor} />
          </View>
        )}
        {isError && (
          <View style={styles.center}>
            <NotFound info={'Unfortunately, there is no game in your current location'} />
            <Button
              onPress={() => navigation.navigate(appRoutes.LOGIN_SCREEN)}
              buttonColor={primaryColor}
              textColor="white"
              style={{
                borderRadius: borderRadius,
                marginHorizontal: 16,
                marginVertical: 12,
              }}
            >
              Go Back
            </Button>
          </View>
        )}
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
            <View style={styles.center}>
              <ActivityIndicator animating={true} size="large" color={primaryColor} />
            </View>
            <View style={styles.wrapperGameList}>
              {copies.map((item) => (
                <GameCard
                  id={item.id}
                  navigation={navigation}
                  size="large"
                  isGameAlike={false}
                  key={item.id}
                />
              ))}
            </View>
          </ScrollView>
        </Layout>

        {isActiveFilter ? <Filter filterType={FilterTypes.Category} /> : ''}
      </>
    );
  }
};

export default HomeFeedScreen;

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  wrapperGameList: {
    zIndex: 10,
  },
});
