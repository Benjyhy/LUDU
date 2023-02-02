import React, { useState } from 'react';
import {
  Text,
  Avatar,
  Card,
  Title,
  Provider as PaperProvider,
  Appbar,
} from 'react-native-paper';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import data from '../../mocks/UserBookingMockData';
import moment from 'moment';
import { primaryColor } from '../../utils/const';
import FilterBookingHistory from '../../components/FilterHistory';

const LeftContent = (image) => <Avatar.Image size={60} source={image} />;

const rightContent = (status) => (
  <Text style={status === 'inprogress' ? styles.inprogress : styles.finished}>
    {status}
  </Text>
);

const CardItem = ({ item }) => {
  return (
    <Card
      style={styles.cardStyle}
      mode={item.status === 'inprogress' ? 'elevated' : 'contained'}
    >
      <Card.Title
        title={item.gameName}
        titleStyle={styles.title}
        subtitle={item.storeName}
        subtitleStyle={styles.subtitle}
        left={() => LeftContent(item.gameImgUrl)}
        right={() => rightContent(item.status)}
      />
      <Card.Content style={styles.content}>
        <Title>
          <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Delivery:
          </Text>{' '}
          {item.bookingType}
        </Title>
        <Text style={styles.text}>
          Booked at {moment(item.startDate).format('LLLL')}
        </Text>
      </Card.Content>
    </Card>
  );
};

const BookingTabsScreen = () => {
  const [isActiveFilter, setIsActiveFilter] = React.useState(false);
  let [datas, setDatas] = React.useState([...data]);

  const [checked, setChecked] = useState('All');

  React.useEffect(() => {
    if (checked === 'inprogress') {
      datas = [...data];
      datas = datas.filter((it) => it.status === 'inprogress');
      setDatas([...datas]);
    } else if (checked === 'finished') {
      datas = [...data];
      datas = datas.filter((it) => it.status === 'finished');
      setDatas([...datas]);
    } else {
      datas = [...data];
      setDatas([...datas]);
    }
  }, [checked]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: primaryColor,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              marginHorizontal: 15,
              marginTop: 29,
              color: 'white',
            }}
          >
            Booking's History
          </Text>
          <TouchableOpacity
            onPress={() => setIsActiveFilter(!isActiveFilter)}
            style={{ marginHorizontal: 15, marginTop: 14 }}
          >
            <Appbar.Action icon="tune" color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={datas}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item.id}
        />

        <FilterBookingHistory
          active={isActiveFilter}
          onFilterClick={(value) => setIsActiveFilter(value)}
          checked={checked}
          setChecked={setChecked}
        />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 20,
  },
  cardStyle: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 170,
  },
  content: {
    marginTop: 20,
  },
  text: {
    marginTop: 10,
  },
  inprogress: {
    color: 'green',
    marginRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle: 'italic',
  },
  finished: {
    color: primaryColor,
    marginRight: 10,
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default BookingTabsScreen;
