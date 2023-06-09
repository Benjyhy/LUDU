import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import NotFound from '../components/NotFound';

const LoadingScreen = () => {
  return (
    <View style={styles.center}>
      <NotFound info={'We are currently retrieving your location'} />
      <ActivityIndicator />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
