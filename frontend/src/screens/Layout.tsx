import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { StatusBar, StyleSheet } from 'react-native';
import { lowGray, verticalPadding } from '../utils/const';

interface ILayout {
  children: JSX.Element;
  title?: string;
  action?: JSX.Element;
}

const Layout = ({ children, title, action }: ILayout) => {
  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      <View style={styles.wrapper}>
        {title && (
          <>
            <View style={styles.titleWrapper}>
              <Text variant="titleMedium">{title}</Text>
              <View style={{ padding: 0 }}>{action && action}</View>
            </View>
            {children}
          </>
        )}
      </View>
      {!title && <View style={styles.wrapperWithOutTitle}>{children}</View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: lowGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    padding: verticalPadding,
  },
  wrapperWithOutTitle: {
    paddingLeft: verticalPadding,
    paddingRight: verticalPadding,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: lowGray,
  },
});

export default Layout;
