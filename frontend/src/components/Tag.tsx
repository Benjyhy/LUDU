import React from 'react';
import { Text } from 'native-base';

const Tag = ({ tagName }: any) => {
    return (
        <Text
            color="orange.500"
            w="auto"
            borderRadius={3}
            borderColor="orange.500"
            borderWidth={1}
            fontSize={11}
            fontWeight="bold"
            px="1"
            py="1"
        >
            {tagName}
        </Text>
    );
}

export default Tag;