import React, { useState } from "react";
import { Button, View, Text, Heading } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import findRoutes from "../../navigation/appRoutes/findRoutes";

function DatePickerScreen({ route, navigation }: any) {
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
    const showDatePicker = () => {
        setShow(true);
    };
    return (
        <View alignItems="center" marginTop={100} >
            <View paddingX={8} paddingTop={5}>
                <Heading>Booking for: {route.params.gameName}</Heading>
                <Text>
                    at <Text fontWeight="bold">Game store name</Text>
                </Text>
            </View>
            <View alignItems="center" marginTop={40}>
                <Button
                    width={40}
                    background="#545454"
                    onPress={() => {
                        showDatePicker();
                    }}
                >
                    Choose Date
                </Button>
                <View>
                    <Text fontSize={15}>Date chosen:</Text>
                    <Text fontWeight="bold" fontSize={18}>
                        {moment(date).format("DD/MM/YYYY")}
                    </Text>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
                <Button
                    width={80}
                    background="#545454"
                    alignContent="center"
                    marginTop={100}
                    borderRadius={5}
                    onPress={() =>
                        navigation.navigate(findRoutes.PERIOD_FEED, {
                            names: moment(date).format("DD/MM/YYYY"),
                        })
                    }
                >
                    Continue
                </Button>
            </View>
        </View>
    );
}

export default DatePickerScreen;
