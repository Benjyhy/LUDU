import * as React from 'react';
import { SafeAreaView, View, StatusBar, StyleSheet } from 'react-native';
import { lowGray, verticalPadding } from '../utils/const';

interface ILayout {
  children: JSX.Element;
  title?: string;
  action?: JSX.Element;
}

const Layout = ({ children }: ILayout) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      <View style={styles.wrapper}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: verticalPadding,
    paddingRight: verticalPadding,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: lowGray,
  },
});

export default Layout;
