import React, { useEffect, useState } from 'react';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/navigation/Navigator';
import { navigationRef } from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import LogoAnim from './src/components/LogoAnim';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  type ICustomTheme = MyThemeType;
}

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (!loading)
    return (
      <NativeBaseProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <StackNav />
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    );

  return <LogoAnim />;
};

export default App;
