import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./src/navigation/Navigator";
import { navigationRef } from "./src/navigation/rootNavigation";
import { Provider } from "react-redux";
import store from "./src/store"

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
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <NavigationContainer ref={navigationRef}>
                    <StackNav />
                </NavigationContainer>
            </Provider>
        </NativeBaseProvider>
    );
};

export default App;
