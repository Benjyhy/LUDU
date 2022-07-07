import React from "react";
import {
    Text,
    HStack,
    Switch,
    useColorMode,
    NativeBaseProvider,
    extendTheme,
    VStack,
    Code,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./src/navigation/Navigator";

// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
    type ICustomTheme = MyThemeType;
}

// Color Switch Component
function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === "light"}
                onToggle={toggleColorMode}
                aria-label={
                    colorMode === "light"
                        ? "switch to dark mode"
                        : "switch to light mode"
                }
            />
            <Text>Light</Text>
        </HStack>
    );
}

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <StackNav />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
