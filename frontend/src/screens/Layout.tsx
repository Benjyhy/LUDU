import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { StatusBar, StyleSheet } from 'react-native';
import { lowGray, verticalPadding } from '../utils/const';

const headerHeight = StatusBar.currentHeight;

const Layout = ({ children, title }) => {
  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      {title && (
        <View style={styles.titleWrapper}>
          <Text variant="titleMedium" style={{ marginLeft: verticalPadding }}>
            {title}
          </Text>
        </View>
      )}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    backgroundColor: '#fff',
    borderColor: lowGray,
    borderTopWidth: 1,
    paddingVertical: 8,
  },
});

export default Layout;
