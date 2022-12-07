import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InlineTextIcon } from './InlineTextIcon';
import { View } from 'native-base';

interface IButton {
  onPress: () => void;
  icon?: string;
  inversed?: boolean;
  disable?: boolean;
  background?: string;
  text: string;
}

export const Button = ({
  onPress,
  icon,
  inversed,
  text,
  disable,
  background,
}: IButton) => {
  // normalText | whiteTheme
  // const style = props.normalText ? { fontWeight: 'bold', fontSize: 15, fontFamily: undefined } : {}
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: background }]}
      onPress={onPress}
      disabled={disable && true}
    >
      <View
        style={{
          opacity: disable ? 0.6 : 1,
          backgroundColor: icon ? 'transparant' : background,
        }}
      >
        {icon ? (
          <InlineTextIcon icon={icon} text={text} inversed={inversed} />
        ) : (
          <Text
            style={{ ...styles.text }}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: 40,
    width: 140,
    borderRadius: 8,
    borderEndWidth: 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
});
