import React, { useState } from "react";
import {Button, View, Text, Heading, HStack, Box} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Checkbox } from "native-base";
import findRoutes from "../../navigation/appRoutes/findRoutes";

function PeriodScreen({ route, navigation }: any) {

    const [buttonSelected, setButtonSelected] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [clickedId, setClickedId] = useState(0);
    const gameName = route.params.gameName;
    const date = route.params.date;
    const handleChange = (e) => {
        setSelection(e)
    }
    const handleNavigation = () => {
        isSelected
            ? navigation.navigate(findRoutes.TIME_FEED, {
                gameName: gameName,
                date: date,
            })
            : navigation.goBack();
    }
    // function ButtonGroup({ buttons }) {
    //     {
    //         <View />;
    //         buttons.map((buttonLabel, index) => {
    //             return (
    //                 <TouchableOpacity
    //                     onPress={item => handleClick(item, index)}
    //                     key={index}
    //                     style={[
    //                         index === clickedId
    //                             ? styles.buttonActive
    //                             : styles.button,
    //                     ]}
    //                 >
    //                     <Text color="#000000" paddingTop={5}>
    //                         {buttonLabel}
    //                     </Text>
    //                 </TouchableOpacity>
    //             );
    //         });
    //     }
    // }
    return (
        <View alignItems="center" paddingTop={100}>
            <View paddingX={8} paddingTop={5}>
                <Heading>Booking for: {route.params.gameName}</Heading>
                <Text>
                    at{" "}
                    <Text fontWeight="bold">
                        Game store name on{" "}
                        <Text fontWeight="bold" fontSize={18}>
                            {route.params.date}
                        </Text>
                    </Text>
                </Text>
                <Box width="100%" display="flex" flexDirection="row" marginTop={50}>
                    <Checkbox value="time" onChange={handleChange}>Bring me the game home</Checkbox>
                </Box>
                <Text marginTop={5}>When do you want to come and play?</Text>
            </View>
            <View style={styles.container} marginLeft={70} paddingTop={20}>
                <Button.Group
                    isAttached
                    colorScheme="blue"
                    mx={{
                        base: "auto",
                        md: 0,
                    }}
                    width={80}
                >
                    <Button variant="outline">Morning</Button>
                    <Button variant="outline">Afternoon</Button>
                    <Button variant="outline">Evening</Button>
                </Button.Group>
            </View>
            <Button
                background="#545454"
                width={80}
                borderRadius={5}
                position="absolute"
                top="210%"
                onPress={(e) => handleNavigation(e)}
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
