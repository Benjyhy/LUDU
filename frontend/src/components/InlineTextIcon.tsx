import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Box } from 'native-base';

interface IInlineTextIcon {
  text: string;
  inversed?: boolean;
  icon?: string;
  background?: string;
}
export const InlineTextIcon = ({
  text,
  icon,
  inversed,
  background,
}: IInlineTextIcon) => {
  return (
    <Box
      style={[
        styles.inlineText,
        { backgroundColor: background ? background : '' },
      ]}
    >
      {inversed ? (
        <>
          <Text style={{ marginRight: 8 }}>{text}</Text>
          <Icon size={16} name={icon} />
        </>
      ) : (
        <>
          <Icon size={16} name={icon} />
          <Text style={{ marginLeft: 8 }}>{text}</Text>
        </>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  inlineText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
