import React, { useState } from 'react';
import { Box } from 'native-base';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Spinner } from 'native-base';
import { TextInput } from 'react-native-element-textinput';
import appRoutes from '../navigation/appRoutes/index';
import { Button } from '../components/Button';
import { errorColor, primaryColor } from '../utils/colors';
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
    <View style={styles.container}>
      {!loading && (
        <>
          <TextInput
            value={usernameInput}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Email"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setUsernameInput(text);
            }}
          />
          <TextInput
            value={password}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Password"
            placeholderTextColor="gray"
            secureTextEntry
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Button onPress={login} text={'Login'} background={primaryColor} />
          <Box my={4}>
            <TouchableOpacity
              onPress={() => navigation.navigate(appRoutes.REGISTER_SCREEN)}
            >
              <Text style={styles.registerTextStyle}>Create an account</Text>
            </TouchableOpacity>
          </Box>
          <Box justifyContent={'center'} alignItems={'center'}>
            {error && (
              <>
                <Text style={{ color: errorColor }}>Wrong credentials</Text>
              </>
            )}
          </Box>
        </>
      )}
      {loading && (
        <>
          <Spinner />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
