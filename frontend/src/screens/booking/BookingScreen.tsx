import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { useGetUserRentsQuery } from '../../services/LUDU_API/rents';
import { FilterTypes } from '../../models/Filter';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { Rent, RentStatus } from '../../models/states/Rent';
import { primaryColor } from '../../utils/const';
import bookingRoute from '../../navigation/appRoutes/bookingRoutes';
import { Button } from 'react-native-paper';

const BookingTabsScreen = ({ navigation }) => {
  const userLogged = useSelector((state: MainAppState) => state.user);
  const filterStatus = useSelector((state: MainAppState) => state.filterBookingsByStatus);
  const getParams = () => {
    const params = { _id: userLogged.id };
    if (!filterStatus.filters.length) {
      return params;
    }
    return {
      ...params,
      done: filterStatus.filters.includes(RentStatus.OVER),
      delivered:
        filterStatus.filters.includes(RentStatus.OVER) ||
        filterStatus.filters.includes(RentStatus.INPROGRESS),
    };
  };
  const {
    data: rents,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUserRentsQuery(getParams(), { refetchOnMountOrArgChange: true });

  if (isError) {
    console.log(error);
  }

  return (
    <>
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color={primaryColor} />
        </View>
      )}
      <Layout>
        {isSuccess && (
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 14 }}>
            {rents.map((rent: Rent, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(bookingRoute.BOOKING_ACTION_SCREEN, {
                      rent,
                    })
                  }
                  key={index}
                >
                  <CardItem rent={rent} isAction={true} />
                </TouchableOpacity>
              );
            })}
            {filterStatus.active ? <Filter filterType={FilterTypes.Status} /> : ''}
          </ScrollView>
        )}
      </Layout>
    </>
  );
};

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
    height: '100%',
  },
});

export default BookingTabsScreen;
