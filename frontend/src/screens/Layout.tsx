import * as React from 'react';
import { View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Text } from "react-native-paper";
import {StatusBar} from "react-native"

const Layout = ({children, title}) => {
    const headerHeight = StatusBar.currentHeight

    return (
        <View style={{marginTop:headerHeight}}>
            {title && <Text variant='titleMedium' style={{marginLeft:headerHeight}}>{title}</Text>}
            {children}
        </View>
    )
    
}

export default Layout