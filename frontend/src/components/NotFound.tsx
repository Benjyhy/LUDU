import React from 'react';
import { View } from 'react-native';
import { Image, StyleSheet } from 'react-native';

const NotFound = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/not-found.png')} />;
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
    height: '100%',
  },
});

export default NotFound;
