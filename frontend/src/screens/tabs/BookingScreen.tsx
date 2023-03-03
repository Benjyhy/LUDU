import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { RentStatus } from '../../models/states/Rent';
import { useGetUserRentsQuery } from '../../services/LUDU_API/rents';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';

const BookingTabsScreen = () => {
  const userLogged = useSelector((state: MainAppState) => state.user);
  const [done, setDone] = useState();
  const [delivered, setDelivered] = useState();
  const { data: rents = [] } = useGetUserRentsQuery(
    {
      _id: userLogged.id,
      done: done,
      is_delivered: delivered,
    },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <Layout>
      <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={rents}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item._id}
        />
        <Filter
          filters={Object.values(RentStatus)}
          filterType="status"
          title="Filter your bookings, past or future"
          setDone={setDone}
          setDelivered={setDelivered}
        />
      </View>
    </Layout>
  );
};

export default BookingTabsScreen;
