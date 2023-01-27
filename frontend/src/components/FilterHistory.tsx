import React from 'react';
import { Dimensions, Modal, View } from 'react-native';
import { Button, Text, RadioButton } from 'react-native-paper';
import { primaryColor } from '../utils/colors';

const filters = ['All', 'inprogress', 'finished']

const FilterBookingHistory = ({ active, onFilterClick, checked, setChecked }) => {
  
  const onButtonPress = () => {
   onFilterClick(!active);
  };
  
  const handleCheckChange = (filter: string) => {
    checked = filter;
    setChecked(filter)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={active}
    >
      <View style={{
        justifyContent: "space-between",
        height: Dimensions.get('window').height,
        width: "100%",
        zIndex: 100,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 50,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.65,

        elevation: 8,
      }}>
        <View style={{ justifyContent: "space-around", height: "100%" }}>
          <Text variant="headlineSmall" style={{ fontWeight: "bold", textAlign: "center" }}>Filter History</Text>
          <View>
            {filters.map((filter, index) => (
              <View key={index.toString()} style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton.Android
                  color={primaryColor}
                  uncheckedColor={primaryColor}
                  status={checked === filter ? "checked" : "unchecked"}
                  value={filter}
                  onPress={() =>
                    handleCheckChange(filter)
                  } 
                />
                <Text>{filter}</Text>
              </View>
            ))}
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "center"
          }}>
            <Button mode={"text"} onPress={onButtonPress} textColor="black" style={{ width: 80 }}>Cancel</Button>
            <Button onPress={onButtonPress} buttonColor={primaryColor} textColor="white" style={{ width: 80 }}>Filter</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterBookingHistory;
