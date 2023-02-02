import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { InlineTextIcon } from '../../components/InlineTextIcon';
import {
  lowGray,
  middleGray,
  strongGray,
  verticalPadding,
} from '../../utils/const';
import Layout from '../Layout';
import AvatarMe from '../me/Avatar';
import { MaterialIcons } from '@expo/vector-icons';

const MeScreen = () => {
  const username = 'Paul';
  const avatarUri =
    'https://avatars.githubusercontent.com/u/55087969?s=400&u=a57cf70988be3cdefe55132d61bd532499b5dcd9&v=4';

  return (
    <Layout title={'Profil'}>
      <View style={styles.wrapperView}>
        <AvatarMe avatarUri={avatarUri} username={username} />
        <View style={styles.row}>
          <InlineTextIcon text="About ludu" icon={'help'} />
          <View style={styles.container}>
            <Button>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                color={middleGray}
                size={24}
              />
            </Button>
          </View>
        </View>
        <View style={styles.row}>
          <InlineTextIcon text="Favorite games" icon={'heart'} />
          <View style={styles.container}>
            <Button>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                color={middleGray}
                size={24}
              />
            </Button>
          </View>
        </View>
        <View style={styles.row}>
          <InlineTextIcon text="My wallet" icon={'wallet'} />
          <View style={styles.container}>
            <Text style={{ marginLeft: 4, color: strongGray }}>66.0€</Text>
            <Button>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                color={middleGray}
                size={24}
              />
            </Button>
          </View>
        </View>
        <View style={styles.row}>
          <InlineTextIcon text="Settings" icon={'settings-outline'} />
          <View style={styles.container}>
            <Button>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                color={middleGray}
                size={24}
              />
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapperView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lowGray,
    borderColor: lowGray,
    borderTopWidth: 1,
    borderWidth: 1,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: verticalPadding,
    paddingRight: verticalPadding,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: lowGray,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MeScreen;
