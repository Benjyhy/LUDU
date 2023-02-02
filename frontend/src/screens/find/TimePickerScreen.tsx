import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import { primaryColor } from '../../utils/const';

function TimePickerScreen({ route, navigation }: any) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }
    setDate(selectedDate);
  };

  const handleNavigation = () => {
    navigation.navigate(findRoutes.BOOKING_CONFIRMATION, {
      game: route.params.game,
    });
  };
  return (
    <View style={{ height: '100%', alignItems: 'center' }}>
      <View style={{ marginTop: 70 }}>
        <View
          style={{ paddingHorizontal: 8, alignItems: 'center', paddingTop: 5 }}
        >
          <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
            Booking for: {route.params.game.gameId.gameName}
          </Text>
          <Text variant="bodyLarge">
            at{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {route.params.game.storeName}{' '}
              <Text style={{ fontWeight: 'bold' }}>today</Text>
            </Text>
          </Text>
        </View>

        <View style={{ marginTop: 80 }}>
          <Text>When do you want us to bring you the game?</Text>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          display="default"
          onChange={onChange}
        />
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 15 }}>Time chosen:</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 13 }}>
          {`${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(
            -2,
          )}`}
        </Text>
      </View>
      <Button
        style={[styles.btn]}
        buttonColor={primaryColor}
        textColor="white"
        onPress={() => handleNavigation()}
      >
        Continue
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  btn: {
    borderRadius: 5,
    width: 'auto',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonActive: {
    backgroundColor: '#000000',
  },
  textActive: {
    color: 'white',
  },
});

export default TimePickerScreen;
