import React, { useState } from "react";
import {Button, View, Text, Heading, Flex, Box, Checkbox} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { findRoutes } from "../../navigation/appRoutes/findRoutes";

function TimePickerScreen({ route, navigation }: any) {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        setShow(false);
        if (event?.type === "dismissed") {
            setDate(date);
            return;
        }
        setDate(selectedDate);
    };
    const showTimePicker = () => {
        setShow(true);
    };
    return (
        <Flex alignItems="center" paddingTop={100}>
            <View paddingX={8} paddingTop={5}>
                <Heading>Booking for: { route.params.gameName }</Heading>
                <Text>
                    at <Text fontWeight="bold">Game store name on{" "}</Text>
                    <Text fontWeight="bold" fontSize={18}>
                        {route.params.date}
                    </Text>
                </Text>
                <Box width="100%" display="flex" flexDirection="row" marginTop={50}>
                    <Checkbox value="time" defaultIsChecked>Bring me the game home</Checkbox>
                </Box>
                <Text marginTop={5}>When do you want us to bring you the game?</Text>
            </View>
            <View display="flex" flexDirection="column" alignItems="center" paddingTop={75}>
                <Button
                    width={80}
                    background="#545454"
                    onPress={() => {
                        showTimePicker();
                    }}
                >
                    Choose Time for delivery
                </Button>
                <View>
                    <Text fontSize={15}>Time chosen:</Text>
                    <Text fontWeight="bold" fontSize={18}>
                        {`${`0${date.getHours()}`.slice(
                            -2,
                        )}:${`0${date.getMinutes()}`.slice(-2)}`}
                    </Text>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="time"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <Button
                width={80}
                background="#545454"
                borderRadius={5}
                position="absolute"
                top="190%"
            >
                Continue
            </Button>
        </Flex>
    );
}

export default TimePickerScreen;
