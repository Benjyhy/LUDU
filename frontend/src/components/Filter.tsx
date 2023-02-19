import React, { useState } from 'react';
import { View, Modal, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Button, Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { primaryColor } from '../utils/const';
import { setStatusFilter, toggleStatusFilter } from '../store/actions/filterBookingsByStatusAction';
import {
  setCategoryFilter,
  toggleCategoryFilter,
} from '../store/actions/filterGamesByCategoriesAction';
import { MainAppState } from '../models/states';
import { FilterOptions } from '../models/Filter';

interface FilterProps {
  filters: FilterOptions;
  filterType: string;
  title: string;
}

const Filter = ({ filters, filterType, title }: FilterProps) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<string[]>([]);
  const filterIsActive = useSelector((state: MainAppState) =>
    filterType === 'status'
      ? state.filterBookingsByStatus.active
      : state.filterGamesByCategories.active,
  );

  const onButtonPress = () => {
    if (filterType === 'status') {
      dispatch(toggleStatusFilter());
      dispatch(setStatusFilter(checked));
    } else {
      dispatch(toggleCategoryFilter());
      dispatch(setCategoryFilter(checked));
    }
  };
  const handleCheckChange = (filter: string, include: boolean) => {
    if (!include) {
      setChecked([...checked, filter]);
    } else {
      setChecked(checked.filter((e) => e !== filter));
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={filterIsActive}>
      <View
        style={{
          justifyContent: 'space-between',
          height: Dimensions.get('window').height,
          width: '100%',
          zIndex: 100,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.65,

          elevation: 8,
        }}
      >
        <View style={{ justifyContent: 'space-around', height: '100%' }}>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {title}
          </Text>
          <View>
            {filters.map((filter, index) => (
              <View key={index.toString()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox.Android
                  color={primaryColor}
                  uncheckedColor={primaryColor}
                  status={checked.includes(filter) ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckChange(filter, checked.includes(filter))}
                  key={index}
                />
                <Text>{filter}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button mode={'text'} onPress={onButtonPress} textColor="black" style={{ width: 80 }}>
              Cancel
            </Button>
            <Button
              onPress={onButtonPress}
              buttonColor={primaryColor}
              textColor="white"
              style={{ width: 80 }}
            >
              Filter
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Filter;
