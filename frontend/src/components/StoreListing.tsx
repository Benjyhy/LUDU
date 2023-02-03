import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const StoreListing = ({ items, selectedGame }: any) => {
  const [itemSelected, updateItemSelected] = useState([]);
  useEffect(() => {
    selectedGame(itemSelected[0]);
  }, [itemSelected]);

  const handleItemSelected = (filter: any, id) => {
    itemSelected.push(filter);
    updateItemSelected(itemSelected.filter((it) => it?.id === id));
  };

  return (
    <View style={{ paddingVertical: 6 }}>
      <View style={{ justifyContent: 'space-between' }}>
        {/* <Avatar
                                    size="48px"
                                    source={{
                                        uri: item.avatarUrl,
                                    }}
                                /> */}
        {items.map((item, index) => (
          <View
            key={index.toString()}
            style={{ margin: 4, paddingVertical: 8 }}
          >
            <TouchableOpacity
              onPress={() => handleItemSelected(item, item.id)}
              style={
                itemSelected[0]?.id === item.id ? styles.listPress : styles.list
              }
            >
              <Text
                style={
                  itemSelected[0]?.id === item.id
                    ? styles.textPress
                    : styles.text
                }
              >
                {item.storeName}
              </Text>
              <Text
                style={
                  itemSelected[0]?.id === item.id
                    ? styles.cityPress
                    : styles.city
                }
              >
                {item.city.toUpperCase()}
              </Text>
            </TouchableOpacity>
            <Divider style={{ marginTop: 5 }} />
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
  },
  listPress: {
    backgroundColor: '#f04040',
    borderRadius: 6,
    padding: 12,
  },
  textPress: {
    color: '#fff',
    fontWeight: 'bold',
  },

  text: {
    color: 'black',
    fontWeight: 'bold',
  },

  cityPress: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },

  city: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
export default StoreListing;
