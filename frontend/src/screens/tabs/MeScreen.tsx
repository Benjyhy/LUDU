import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.wrapperView}>
          <AvatarMe avatarUri={avatarUri} username={username} />
          <TouchableOpacity style={styles.row}>
            <InlineTextIcon text="Customization" icon={'help'} />
            <View style={styles.container}>
              <Button>
                <MaterialIcons
                  name={'keyboard-arrow-right'}
                  color={middleGray}
                  size={24}
                />
              </Button>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <InlineTextIcon text="Favorite games" icon={'heart-outline'} />
            <View style={styles.container}>
              <Button>
                <MaterialIcons
                  name={'keyboard-arrow-right'}
                  color={middleGray}
                  size={24}
                />
              </Button>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <InlineTextIcon text="My wallet" icon={'wallet-outline'} />
            <View style={styles.container}>
              <Text style={{ marginLeft: 4, color: strongGray }}>66.00€</Text>
              <Button>
                <MaterialIcons
                  name={'keyboard-arrow-right'}
                  color={middleGray}
                  size={24}
                />
              </Button>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
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
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <InlineTextIcon
              text="About Ludu"
              icon={'information-circle-outline'}
            />
            <View style={styles.container}>
              <Button>
                <MaterialIcons
                  name={'keyboard-arrow-right'}
                  color={middleGray}
                  size={24}
                />
              </Button>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <InlineTextIcon text="My reviews" icon={'happy-outline'} />
            <View style={styles.container}>
              <Button>
                <MaterialIcons
                  name={'keyboard-arrow-right'}
                  color={middleGray}
                  size={24}
                />
              </Button>
            </View>
          </TouchableOpacity>
          <View style={styles.rowPrivacy}>
            <Text variant="bodySmall">Privacy Policy</Text>
            <Text variant="titleSmall" style={{ margin: 8 }}>
              .
            </Text>
            <Text variant="bodySmall">Use of cookies</Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapperView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  rowPrivacy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lowGray,
    alignSelf: 'stretch',
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default MeScreen;
