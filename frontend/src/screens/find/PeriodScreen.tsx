import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Checkbox, SegmentedButtons, Button } from 'react-native-paper';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import DateTimePicker from '@react-native-community/datetimepicker';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';

function PeriodScreen({ route, navigation }: any) {
  const [buttonSelected, setButtonSelected] = useState('morning');
  const [isSelected, setSelection] = useState(false);
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }
    setDate(selectedDate);
  };
  const game = route.params.game;

  const handleNavigation = () => {
    isSelected
      ? navigation.navigate(findRoutes.BOOKING_CONFIRMATION, {
          game: game,
        })
      : navigation.goBack();
  };
  return (
    <Layout>
      <View style={{ position: 'relative', height: '100%', alignItems: 'center' }}>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              paddingHorizontal: 8,
              alignItems: 'center',
              paddingTop: 5,
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
              Booking for: {game.gameId.gameName}
            </Text>
            <Text variant="bodyLarge">
              at{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {game.storeName} <Text>on</Text>{' '}
                <Text style={{ fontWeight: 'bold' }}>{route.params.date}</Text>
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: 'auto',
              flexDirection: 'row-reverse',
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text variant="titleMedium">Bring me the game home</Text>
            <Checkbox.Android
              status={isSelected ? 'checked' : 'unchecked'}
              color={primaryColor}
              uncheckedColor={primaryColor}
              onPress={() => {
                setSelection(!isSelected);
              }}
            />
          </View>
        </View>
        {!isSelected ? (
          <View style={styles.container}>
            <Text variant="titleMedium" style={{ marginBottom: 10 }}>
              When do you want to come and play?
            </Text>

            <SegmentedButtons
              value={buttonSelected}
              onValueChange={setButtonSelected}
              buttons={[
                {
                  value: 'morning',
                  label: 'Morning',
                },
                {
                  value: 'afternon',
                  label: 'Afternoon',
                },
                { value: 'evening', label: 'Evening' },
              ]}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Text variant="titleMedium" style={{ marginBottom: 10 }}>
              What time do you want the game delivered ?
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 5 }}>
                <Text variant="bodyLarge">Chosen time:</Text>
              </View>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                display="default"
                onChange={onChange}
              />
            </View>
          </View>
        )}
        <Button
          style={[styles.btn]}
          buttonColor={primaryColor}
          textColor="white"
          onPress={() => handleNavigation()}
        >
          Continue
        </Button>
      </View>
    </Layout>
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
export default PeriodScreen;
