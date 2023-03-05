import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, StatusBar } from 'react-native';
import appRoutes from '../navigation/appRoutes/index';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Button, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { borderRadius, errorColor, lowGray, primaryColor, secondaryColor } from '../utils/const';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/userAction';
import { useLoginMutation } from '../services/LUDU_API/auth';
import * as SecureStore from 'expo-secure-store';

const { width: ScreenWidth } = Dimensions.get('screen');
const headerHeight = StatusBar.currentHeight;

export default function Login({ navigation }: any) {
  const [usernameInput, setUsernameInput] = useState<string>('User');
  const [password, setPassword] = useState<string>('password');
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [login, { data, isLoading, isSuccess, isError }] = useLoginMutation();

  const handleLogin = async () => {
    await login({ username: usernameInput, password });
  };
  const saveAuthToken = async (token) => {
    await SecureStore.setItemAsync('authToken', token);
  };

  useEffect(() => {
    const getUser = async () => {
      if (isSuccess) {
        const user = {
          token: data.token,
          id: data.user._id,
          username: data.user.username,
          role: data.user.role,
          email: data.user.credentials.local.email,
          phone: data.user.phone,
          address: data.user.address,
          avatar: data.user.avatar,
        };
        dispatch(setUser(user));
        navigation.navigate(appRoutes.TAB_NAVIGATOR);
        await saveAuthToken(user.token);
      }
    };
    getUser().catch((e) => console.log(e));
    if (isError) {
      setError(true);
    }
    // navigation.navigate(appRoutes.TAB_NAVIGATOR);
  }, [isSuccess, isError]);

  return (
    <View>
      <LinearGradient colors={[primaryColor, secondaryColor]} style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/ludu_logo.png')} />
        {!isLoading && (
          <>
            <TextInput
              value={usernameInput}
              style={styles.input}
              label="Username"
              placeholderTextColor="gray"
              activeOutlineColor={`${primaryColor}`}
              outlineColor={`${lowGray}`}
              selectionColor={`${primaryColor}`}
              underlineColor="transparent"
              theme={{
                colors: {
                  primary: primaryColor,
                },
              }}
              onChangeText={(text) => {
                setUsernameInput(text);
              }}
            />
            <TextInput
              value={password}
              style={styles.input}
              label="Password"
              placeholderTextColor="gray"
              activeOutlineColor={`${primaryColor}`}
              outlineColor={`${lowGray}`}
              selectionColor={`${primaryColor}`}
              underlineColor="transparent"
              theme={{
                colors: {
                  primary: primaryColor,
                },
              }}
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            {error && (
              <View style={styles.error}>
                <Text style={{ color: '#fff', fontSize: 14 }}>Wrong credentials</Text>
              </View>
            )}
            <View
              style={{
                position: 'absolute',
                bottom: 60,
              }}
            >
              <Button
                onPress={handleLogin}
                buttonColor={primaryColor}
                textColor="white"
                style={{
                  borderRadius: borderRadius,
                  marginHorizontal: 16,
                  marginVertical: 12,
                }}
              >
                Login
              </Button>
              <Button
                onPress={() => navigation.navigate(appRoutes.REGISTER_SCREEN)}
                mode="text"
                textColor="#fff"
                style={{ padding: 0, margin: 0 }}
              >
                Create an account
              </Button>
            </View>
          </>
        )}
        {isLoading && (
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
    paddingTop: headerHeight + 50,
    alignItems: 'center',
    height: '100%',
  },
  input: {
    width: ScreenWidth * 0.8,
    height: 55,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: borderRadius,
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
    shadowColor: '#383838',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.7,
    marginBottom: 60,
  },
  error: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: errorColor,
    color: '#fff',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: borderRadius,
  },
});
