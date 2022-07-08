import React from "react";
import { Text, Slide, Button } from "native-base";

interface FilterProps {
    active: boolean;
    onFilterClick: (value: boolean) => void;
}

const Filter = (props: FilterProps) => {
    const onButtonPress = () => {
        props.onFilterClick(!props.active);
    };
    return (
        <Slide in={props.active} placement="bottom" bg="white">
            <Text>GENDRA</Text>
            <Text>GENDRA</Text>
            <Text>GENDRA</Text>
            <Text>GENDRA</Text>
            <Text>GENDRA</Text>
            <Text>GENDRA</Text>
            <Text>GENDRA</Text>
            <Text>GENDRA</Text>
            <Button onPress={onButtonPress}>Close filter</Button>
        </Slide>
    );
};

export default Filter;
