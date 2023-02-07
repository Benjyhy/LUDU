import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import data from '../../mocks/UserBookingMockData';
import { primaryColor } from '../../utils/const';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { MaterialIcons } from '@expo/vector-icons';

enum EFilter {
  ALL = 'All',
  PROGRESS = 'Inprogress',
  DONE = 'Finished',
}

const BookingTabsScreen = () => {
  const [isActiveFilter, setIsActiveFilter] = useState<boolean>(false);
  const [bookings, setBookings] = useState<any[]>(data);
  const [checked, setChecked] = useState<EFilter[]>([EFilter.ALL]);
  const filters = ['All', 'Inprogress', 'Finished'];

  useEffect(() => {
    if (checked.includes(EFilter.PROGRESS)) {
      setBookings(data.filter((booking) => booking.status === 'inprogress'));
    }

    if (checked.includes(EFilter.DONE)) {
      setBookings(data.filter((booking) => booking.status === 'finished'));
    }

    if (
      checked.includes(EFilter.ALL) ||
      (checked.includes(EFilter.PROGRESS) && checked.includes(EFilter.DONE))
    ) {
      setBookings(data);
    }
  }, [checked]);

  return (
    <Layout>
      <View style={{ backgroundColor: '#fff' }}>
        <FlatList
          data={bookings}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item.id}
        />

        <Filter
          filters={filters}
          active={isActiveFilter}
          onFilterClick={(value) => setIsActiveFilter(value)}
          checked={checked}
          setChecked={setChecked}
        />
      </View>
    </Layout>
  );
};

export default BookingTabsScreen;
