import React from "react";
import { Slide, Button, Checkbox, Flex } from "native-base";
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
        <Slide in={props.active} placement="bottom" bg="white" px="5" py="10">
            <Flex justify="space-between" h="100%">
                <Checkbox.Group onChange={setGroupValues} value={groupValues}>
                    {filters.map((filter, index) => (
                        <Checkbox colorScheme="orange" value={index.toString()} key={index}>
                            {filter}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
                <Button.Group colorScheme="orange">
                    <Button size="lg" w="50%" variant="outline" onPress={onButtonPress}>Cancel</Button>
                    <Button size="lg" w="50%" onPress={onButtonPress}>Filter</Button>
                </Button.Group>
            </Flex>
        </Slide>
    );
};

export default Filter;
