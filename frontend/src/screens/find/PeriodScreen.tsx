import React, { useState } from "react";
import { Button, View, Text, Heading } from "native-base";
import { CheckBox, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { findRoutes } from "../../navigation/appRoutes/findRoutes";

function PeriodScreen({ route, navigation }) {

    const [buttonSelected, setButtonSelected] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [clickedId, setClickedId] = useState(0);
    function handleClick(item, id) {
        setClickedId(id);
    }
    function ButtonGroup({ buttons }) {
        {
            <View />;
            buttons.map((buttonLabel, index) => {
                return (
                    <TouchableOpacity
                        onPress={item => handleClick(item, index)}
                        key={index}
                        style={[
                            index === clickedId
                                ? styles.buttonActive
                                : styles.button,
                        ]}
                    >
                        <Text color="#000000" paddingTop={5}>
                            {buttonLabel}
                        </Text>
                    </TouchableOpacity>
                );
            });
        }
    }
    return (
        <View>
            <View paddingX={8} paddingTop={5}>
                <Heading>Booking for:Uno</Heading>
                <Text>
                    at{" "}
                    <Text fontWeight="bold">
                        Game store name on{" "}
                        <Text fontWeight="bold" fontSize={18}>
                            {route.params.names}
                        </Text>
                    </Text>
                </Text>
                <View display="flex" flexDirection="row">
                    <CheckBox value={isSelected} onValueChange={setSelection} />
                    <Text marginTop={1}>Bring me the game home</Text>
                </View>
                <Text marginTop={5}>When do you want to come and play?</Text>
            </View>
            <View style={styles.container}>
                <Button.Group
                    isAttached
                    colorScheme="blue"
                    mx={{
                        base: "auto",
                        md: 0,
                    }}
                    width={80}
                >
                    <Button>Morning</Button>
                    <Button variant="outline">Afternoon</Button>
                    <Button>Evening</Button>
                </Button.Group>
            </View>
            <Button
                marginTop={20}
                background="#545454"
                width={80}
                alignSelf="center"
                borderRadius={5}
                onPress={() =>
                    isSelected
                        ? navigation.navigate(findRoutes.TIME_FEED, {
                              names: `${route.params.names}`,
                          })
                        : navigation.navigate(findRoutes.DATEPICKER_FEED)
                }
            >
                Continue
            </Button>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
    },
    button: {
        borderColor: "#545454",
        borderWidth: 1,
        borderRadius: 6,
        width: 300,
        height: 40,
        marginTop: 20,
    },
    buttonActive: {
        backgroundColor: "#000000",
    },
    textActive: {
        color: "white",
    },
});
export default PeriodScreen;
