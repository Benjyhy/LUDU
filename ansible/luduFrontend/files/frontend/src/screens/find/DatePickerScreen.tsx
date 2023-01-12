import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper"
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import findRoutes from "../../navigation/appRoutes/findRoutes";
import { primaryColor } from "../../utils/colors";

function DatePickerScreen({ route, navigation }: any) {
    const format = moment(new Date()).format('YYYY-MM-DD');
    const [selected, setSelected] = useState(format);

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


    const game = route.params.game;
    return (
        <View style={{ position: "relative", height: "100%" }}>
            <View style={{ marginTop: 70 }}>
                <View style={{ paddingHorizontal: 8, alignItems: "center", paddingTop: 5 }}>
                    <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>Booking for: {game.gameName}</Text>
                    <Text variant="bodyLarge">
                        at <Text style={{ fontWeight: "bold" }}>Game store name</Text>
                    </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <Calendar
                        current={format}
                        onDayPress={onDayPress}
                        markedDates={marked}
                        theme={{
                            selectedDayBackgroundColor: '#545454',
                            selectedDayTextColor: '#ffffff',
                            arrowColor: '#545454',
                            monthTextColor: '#545454',
                            textDayHeaderFontWeight: '300',
                        }}
                    />
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <Text variant="titleLarge">Chosen date :</Text>
                        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                            {moment(selected).format("DD/MM/YYYY")}
                        </Text>
                    </View>
                </View>
            </View>
            <Button
                buttonColor={primaryColor}
                textColor="white"
                style={[styles.btn]}
                onPress={() =>
                    navigation.navigate(findRoutes.PERIOD_FEED, {
                        date: moment(selected).format("DD/MM/YYYY"),
                        game: game
                    })
                }
            >
                Continue
            </Button>
        </View >
    );
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 5,
        width: "auto",
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 5
    }
})

export default DatePickerScreen;
