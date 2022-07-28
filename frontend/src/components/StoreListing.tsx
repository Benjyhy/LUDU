import {Box, HStack, Spacer, Text, VStack} from "native-base";
import React from "react";

const StoreListing = ({ item }: any) => {
    return(
        <Box
            borderBottomWidth="1"
            _dark={{
                borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            py="6"
        >
            <HStack
                space={3}
                justifyContent="space-between"
            >
                {/* <Avatar
                                    size="48px"
                                    source={{
                                        uri: item.avatarUrl,
                                    }}
                                /> */}
                <VStack>
                    <Text
                        _dark={{
                            color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                    >
                        {item.storeName}
                    </Text>
                    <Text
                        color="coolGray.600"
                        _dark={{
                            color: "warmGray.200",
                        }}
                    >
                        {item.city}
                    </Text>
                </VStack>
                <Spacer />
            </HStack>
        </Box>
    )
}

export default StoreListing;