import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import data from '../../mocks/UserBookingMockData';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { RentStatus } from '../../models/states/Rent';

const BookingTabsScreen = () => {
  const [bookings, setBookings] = useState<any[]>(data);

  return (
    <Layout>
      <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item.id}
        />
        <Filter
          filters={Object.values(RentStatus)}
          filterType="status"
          title="Filter your bookings, past or future"
        />
      </View>
    </Layout>
  );
};

export default BookingTabsScreen;
