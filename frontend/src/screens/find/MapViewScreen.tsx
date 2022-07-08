import React from "react";
import { Center } from "native-base";
import MapView from "react-native-maps";
import { Dimensions, StyleSheet } from "react-native";

const MapViewScreen = () => {
    return (
        <Center>
            <MapView style={styles.map}></MapView>
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
