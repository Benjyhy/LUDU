import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { lowGray, primaryColor } from '../../utils/const';
import { Text } from 'react-native-paper';

const AvatarMe = ({
  avatarUri,
  username,
}: {
  avatarUri: string;
  username: string;
}) => {
  const AvatarWithUri = () => {
    return (
      <>
        <Avatar.Image
          size={84}
          source={{ uri: avatarUri }}
          style={{ marginBottom: 16 }}
        />
        <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
          {username}
        </Text>
      </>
    );
  };

  const AvatarLess = () => {
    return (
      <>
        <Avatar.Text
          size={84}
          label={username.slice(0, 2).toUpperCase()}
          color="white"
          style={{ backgroundColor: primaryColor, marginBottom: 16 }}
        />
        <Text variant="titleSmall" style={{ marginBottom: 16 }}>
          {username}
        </Text>
      </>
    );
  };

  return (
    <View style={styles.wrapper}>
      {avatarUri.length !== 0 ? <AvatarWithUri /> : <AvatarLess />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 1,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: lowGray,
    borderTopWidth: 1,
    borderWidth: 1,
  },
});

export default AvatarMe;
