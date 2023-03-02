import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import data from '../../mocks/UserBookingMockData';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { RentStatus } from '../../models/states/Rent';
import { FilterTypes } from '../../models/Filter';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';

const BookingTabsScreen = () => {
  const [bookings, setBookings] = useState<any[]>(data);
  const isActiveFilter = useSelector((state: MainAppState) => state.filterBookingsByStatus.active);
  return (
    <Layout>
      <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item.id}
        />
        {isActiveFilter ? <Filter filterType={FilterTypes.Status} /> : ''}
      </View>
    </Layout>
  );
};

export default BookingTabsScreen;
