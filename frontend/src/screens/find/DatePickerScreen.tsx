import React, {useCallback, useMemo, useState} from "react";
import {Button, View, Text, Heading, ScrollView, Box} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import findRoutes from "../../navigation/appRoutes/findRoutes";

function DatePickerScreen({ route, navigation }: any) {
    const format = moment(new Date()).format('YYYY-MM-DD');
    const [baseDate, setDate] = useState(format);
    // const handleDayChange = (day: any) => {
    //     setDate(day)
    //     setSelected(!selected)
    //     console.log(baseDate)
    // }
    const [selected, setSelected] = useState(format);
    const [currentMonth, setCurrentMonth] = useState(format);

    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const marked = useMemo(() => {
        return {
            [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#545454',
                selectedTextColor: '#ffffff'
            },
        };
    }, [selected]);


    // const [show, setShow] = useState(false);
    // const onChange = (event, selectedDate) => {
    //     setShow(false);
    //     if (event?.type === "dismissed") {
    //         setDate(date);
    //         return;
    //     }
    //     setDate(selectedDate);
    // };
    // const showDatePicker = () => {
    //     setShow(true);
    // };

    const gameName = route.params.gameName;
    return (
        <ScrollView>
            <View marginTop={70} >
                <View paddingX={8} alignItems="center" paddingTop={5}>
                    <Heading>Booking for: {gameName}</Heading>
                    <Text>
                        at <Text fontWeight="bold">Game store name</Text>
                    </Text>
                </View>
                <View marginTop={20}>
                    <Calendar
                        minDate={selected}
                        current={format}
                        onDayPress={onDayPress}
                        markedDates={marked}
                        theme={{
                            selectedDayBackgroundColor: '#545454',
                            selectedDayTextColor: '#ffffff',
                            arrowColor: '#545454',
                            monthTextColor: '#545454',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                        }}
                    />
                    <View alignItems="center" paddingTop={5}>
                        <Text fontSize={15}>Date chosen:</Text>
                        <Text fontWeight="bold" fontSize={18}>
                            {moment(selected).format("DD/MM/YYYY")}
                        </Text>
                    </View>
                </View>
            </View>
            <Box width="100%" paddingTop={10}>
                <Button
                    width={80}
                    background="#545454"
                    borderRadius={5}
                    alignSelf="center"
                    onPress={() =>
                        navigation.navigate(findRoutes.PERIOD_FEED, {
                            date: moment(selected).format("DD/MM/YYYY"),
                            gameName: gameName
                        })
                    }
                >
                    Continue
                </Button>
            </Box>
        </ScrollView>
    );
}

export default DatePickerScreen;
