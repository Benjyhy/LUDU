import React from "react";
import { Slide, Button, Checkbox } from "native-base";
import { useState } from "react";
import filters from "../mocks/filterMockData";

interface FilterProps {
    active: boolean;
    onFilterClick: (value: boolean) => void;
}

const Filter = (props: FilterProps) => {
    const [groupValues, setGroupValues] = useState([]);
    const onButtonPress = () => {
        props.onFilterClick(!props.active);
    };
    return (
        <Slide in={props.active} placement="bottom" bg="white" px="5" py="20">
            <Checkbox.Group onChange={setGroupValues} value={groupValues}>
                {filters.map((filter, index) => (
                    <Checkbox value={index.toString()} key={index}>
                        {filter}
                    </Checkbox>
                ))}
            </Checkbox.Group>
            <Button onPress={onButtonPress}>Close filter</Button>
        </Slide>
    );
};

export default Filter;
