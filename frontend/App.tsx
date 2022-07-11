import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./src/navigation/Navigator";
import { navigationRef } from "./src/navigation/rootNavigation";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';

// Define the config
// const config = {
//     useSystemColorMode: false,
//     initialColorMode: "dark",
// };

// extend the theme
// export const theme = extendTheme({ config });
// type MyThemeType = typeof theme;
// declare module "native-base" {
//     type ICustomTheme = MyThemeType;
// }

// Color Switch Component
// const ToggleDarkMode = () => {
//     const { colorMode, toggleColorMode } = useColorMode();
//     return (
//         <HStack space={2} alignItems="center">
//             <Text>Dark</Text>
//             <Switch
//                 isChecked={colorMode === "light"}
//                 onToggle={toggleColorMode}
//                 aria-label={
//                     colorMode === "light"
//                         ? "switch to dark mode"
//                         : "switch to light mode"
//                 }
//             />
//             <Text>Light</Text>
//         </HStack>
//     );
// };

const App = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        <NativeBaseProvider>
            <NavigationContainer ref={navigationRef}>
                <StackNav />
                <Text>{text}</Text>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;
