import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { lowGray, primaryColor, strongGray } from '../../utils/const';
import { Text, Button } from 'react-native-paper';

const AvatarMe = ({ avatarUri, username }: { avatarUri: string; username: string }) => {
  const AvatarWithUri = () => {
    return (
      <>
        <Avatar.Image size={84} source={{ uri: avatarUri }} style={{ marginBottom: 16 }} />
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
      </>
    );
  };

  return (
    <View style={styles.wrapper}>
      {avatarUri.length !== 0 ? <AvatarWithUri /> : <AvatarLess />}
      <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
        {username}
      </Text>
      <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
        p.santamara@lapost.net
      </Text>
      <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
        4 avenue Hoche, Lille, 59000
      </Text>
      <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
        0627389128
      </Text>
      <Button textColor={strongGray} mode="outlined">
        Update
      </Button>
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
    borderBottomWidth: 1,
  },
});

export default AvatarMe;
