import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
import stores from '../../mocks/markerStoreMockData';
import { MainAppState } from '../../models/states';
import { useSelector } from 'react-redux';

const MapViewScreen = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const currentLocation = useSelector((state: MainAppState) => state.currentLocation);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {stores.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng} title={marker.title} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapViewScreen;
