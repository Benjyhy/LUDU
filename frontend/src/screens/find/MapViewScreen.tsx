import React from "react";
import { Center } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet } from "react-native";
import stores from "../../mocks/markerStoreMockData";

const MapViewScreen = () => {
    return (
        <Center>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 50.62925,
                    longitude: 3.057256,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {stores.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.latlng}
                        title={marker.title}
                    />
                ))}
            </MapView>
        </Center>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default MapViewScreen;
