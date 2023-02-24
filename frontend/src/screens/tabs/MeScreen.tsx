import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { InlineTextIcon } from '../../components/InlineTextIcon';
import {
  borderRadius,
  errorColor,
  getUserImg,
  horizontalPadding,
  lowGray,
  middleGray,
  primaryColor,
  strongGray,
} from '../../utils/const';
import AvatarMe from '../me/Avatar';
import { MaterialIcons } from '@expo/vector-icons';
import { setUser } from '../../store/actions/userAction';
import appRoutes from '../../navigation/appRoutes';
import { useGetUserByIdQuery } from '../../services/LUDU_API/users';
import { useDispatch, useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';

const MeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const userFromStore = useSelector((state: MainAppState) => state.user);
  const {
    data: user,
    isFetching,
    isSuccess,
  } = useGetUserByIdQuery({
    _id: userFromStore.id,
  });

  const handleLogOut = () => {
    dispatch(
      setUser({
        id: null,
        token: null,
        username: null,
        role: null,
      }),
    );
    navigation.navigate(appRoutes.LOGIN_SCREEN);
  };

  return (
    <>
      {isFetching && (
        <View
          style={{
            flex: 1,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator animating={true} color={primaryColor} />
        </View>
      )}
      {!isFetching && isSuccess && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            <View style={styles.wrapperView}>
              <AvatarMe
                avatarUri={getUserImg(user.avatar)}
                username={user.username}
                email={user.credentials.local.email}
                address={`${user.address}, ${user.postCode}`}
                phone={`+33${user.phone}`}
              />
              <TouchableOpacity style={styles.row}>
                <InlineTextIcon text="Customization" icon={'help'} />
                <View style={styles.container}>
                  <Button>
                    <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                  </Button>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                <InlineTextIcon text="Favorite games" icon={'heart-outline'} />
                <View style={styles.container}>
                  <Button>
                    <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                  </Button>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                <InlineTextIcon text="My wallet" icon={'wallet-outline'} />
                <View style={styles.container}>
                  <Text style={{ marginLeft: 4, color: strongGray }}>66.00€</Text>
                  <Button>
                    <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                  </Button>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                <InlineTextIcon text="Settings" icon={'settings-outline'} />
                <View style={styles.container}>
                  <Button>
                    <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                  </Button>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                <InlineTextIcon text="About Ludu" icon={'information-circle-outline'} />
                <View style={styles.container}>
                  <Button>
                    <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                  </Button>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                <InlineTextIcon text="My reviews" icon={'happy-outline'} />
                <View style={styles.container}>
                  <Button>
                    <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                  </Button>
                </View>
              </TouchableOpacity>
              <View style={styles.rowPrivacy}>
                <Text variant="bodySmall" style={{ fontWeight: '100' }}>
                  Privacy Policy
                </Text>
                <Text variant="titleSmall" style={{ margin: 8 }}>
                  .
                </Text>
                <Text variant="bodySmall" style={{ fontWeight: '100' }}>
                  Use of cookies
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
              }}
            >
              <Button onPress={handleLogOut} buttonColor={errorColor} style={styles.logout}>
                LogOut
              </Button>
            </View>
          </>
        </ScrollView>
      )}
    </>
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
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: horizontalPadding,
    paddingLeft: horizontalPadding,
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
    alignSelf: 'stretch',
    paddingTop: 8,
    paddingBottom: 8,
  },
  logout: {
    width: 200,
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: borderRadius,
    paddingHorizontal: 16,
  },
});

export default MeScreen;
