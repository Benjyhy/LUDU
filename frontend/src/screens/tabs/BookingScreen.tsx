import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { useGetUserRentsQuery } from '../../services/LUDU_API/rents';
import { FilterTypes } from '../../models/Filter';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';

const BookingTabsScreen = () => {
  const userLogged = useSelector((state: MainAppState) => state.user);
  const [done, setDone] = useState();
  const [delivered, setDelivered] = useState();
  const {
    data: rents = [],
    isError,
    error,
  } = useGetUserRentsQuery(
    {
      _id: userLogged.id,
      done: done,
      is_delivered: delivered,
    },
    { refetchOnMountOrArgChange: true },
  );

  if (isError) {
    console.log(error);
  }

  const isActiveFilter = useSelector((state: MainAppState) => state.filterBookingsByStatus.active);
  return (
    <Layout>
      <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={rents}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item._id}
        />
        {isActiveFilter ? (
          <Filter filterType={FilterTypes.Status} setDone={setDone} setDelivered={setDelivered} />
        ) : (
          ''
        )}
      </View>
    </Layout>
  );
};

export default BookingTabsScreen;
