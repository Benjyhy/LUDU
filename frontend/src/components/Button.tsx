import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadius, middleGray } from '../utils/const';

interface IButton {
  children: JSX.Element;
  action?: () => any;
}

const Button: React.FC<IButton> = ({ children, action }) => {
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius,
    marginBottom: 8,
    borderColor: middleGray,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
  },
});

export default Button;
