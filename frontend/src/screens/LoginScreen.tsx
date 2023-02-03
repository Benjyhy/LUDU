import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import appRoutes from '../navigation/appRoutes/index';
import { LinearGradient } from 'expo-linear-gradient';
import {
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import { errorColor, primaryColor, secondaryColor } from '../utils/const';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/userAction';

const { width: ScreenWidth } = Dimensions.get('screen');

export default function Login({ navigation }: any) {
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/local/login', {
        username: usernameInput,
        password: password,
      });
      const token = res.data.user.token;
      const id = res.data.user._id;
      const username = res.data.user.username;
      const avatar = res.data.user.avatar;
      const role = res.data.user.role;
      const email = res.data.user.credentials.local.email;
      dispatch(setUser({ token, id, username, avatar, role, email }));
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setLoading(false);
    navigation.navigate(appRoutes.TAB_NAVIGATOR);
  };

  return (
    <View>
      <LinearGradient
        colors={[primaryColor, secondaryColor]}
        style={styles.container}
      >
        {!loading && (
          <>
            <Image
              style={styles.logo}
              source={require('../../assets/ludu_logo.png')}
            />
            <View>
              <TextInput
                value={usernameInput}
                style={styles.input}
                label="Email"
                placeholderTextColor="gray"
                underlineColor="transparent"
                onChangeText={(text) => {
                  setUsernameInput(text);
                }}
              />
              <TextInput
                value={password}
                style={styles.input}
                label="Password"
                placeholderTextColor="gray"
                underlineColor="transparent"
                secureTextEntry
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
            <View style={{ position: 'absolute', bottom: 100 }}>
              <Button
                onPress={login}
                buttonColor={primaryColor}
                textColor="white"
                style={{ borderRadius: 5, paddingHorizontal: 15 }}
              >
                Login
              </Button>
              <Button
                onPress={() => navigation.navigate(appRoutes.REGISTER_SCREEN)}
                mode="text"
                textColor="black"
              >
                Create an account
              </Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {error && (
                <>
                  <Text style={{ color: errorColor }}>Wrong credentials</Text>
                </>
              )}
            </View>
          </>
        )}
        {loading && (
          <>
            <ActivityIndicator animating={true} color={MD2Colors.amber400} />
          </>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  input: {
    width: ScreenWidth * 0.8,
    height: 55,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputStyle: { fontSize: 16 },
  labelStyle: { fontSize: 14 },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  registerTextStyle: {
    color: '#acabb0',
  },
  logo: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 100,
    shadowColor: '#383838',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.7,
  },
});
