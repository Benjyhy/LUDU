import React from 'react';
import { FlatList, View } from 'react-native';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { useGetUserRentsQuery } from '../../services/LUDU_API/rents';
import { FilterTypes } from '../../models/Filter';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { RentStatus } from '../../models/states/Rent';

const BookingTabsScreen = () => {
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
    isError,
    error,
  } = useGetUserRentsQuery(getParams(), { refetchOnMountOrArgChange: true });

  if (isError) {
    console.log(error);
  }

  return (
    <Layout>
      <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={rents}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item._id}
        />
        {filterStatus.active ? (
          <Filter filterType={FilterTypes.Status} />
        ) : (
          ''
        )}
      </View>
    </Layout>
  );
};

export default BookingTabsScreen;
