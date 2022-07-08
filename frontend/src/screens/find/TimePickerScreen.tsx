import React, { useState } from "react";
import { Button, View, Text, Heading } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { findRoutes } from "../../navigation/appRoutes/findRoutes";

function DatePickerScreen({ route }) {
    const navigation = useNavigation();
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
        <View>
            <View paddingX={8} paddingTop={5}>
                <Heading>Booking for:Uno</Heading>
                <Text>
                    at <Text fontWeight="bold">Game store name on{" "}</Text>
                    <Text fontWeight="bold" fontSize={18}>
                        {route.params.names}
                    </Text>
                </Text>
            </View>
            <View alignItems="center" marginTop={40}>
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
                <Button
                    width={80}
                    background="#545454"
                    alignContent="center"
                    marginTop={90}
                    borderRadius={5}
                >
                    Continue
                </Button>
            </View>
        </View>
    );
}

export default DatePickerScreen;
