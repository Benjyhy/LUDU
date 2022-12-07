import React, { useEffect, useState } from "react";
import { Center } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet } from "react-native";
import stores from "../../mocks/markerStoreMockData";
import { MainAppState } from "../../models/states";
import { useSelector } from "react-redux";

const MapViewScreen = () => {

    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const currentLocation = useSelector((state: MainAppState) => state.currentLocation);

    useEffect(() => {
        setLocation(currentLocation)
    }, [currentLocation])

    return (
        <Center>
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
