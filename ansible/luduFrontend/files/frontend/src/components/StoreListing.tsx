import React from "react";
import { View } from "react-native";
import { Divider, Text } from 'react-native-paper';

const StoreListing = ({ item }: any) => {
    return (
        <View
            style={{ paddingVertical: 6 }}
        >
            <View
                style={{ margin: 3, justifyContent: "space-between" }}
            >
                {/* <Avatar
                                    size="48px"
                                    source={{
                                        uri: item.avatarUrl,
                                    }}
                                /> */}
                <View>
                    <Text
                        style={{ fontWeight: "bold" }}
                    >
                        {item.storeName}
                    </Text>
                    <Text>
                        {item.city}
                    </Text>
                </View>
                <Divider />
            </View>
        </View>
    )
}

export default StoreListing;