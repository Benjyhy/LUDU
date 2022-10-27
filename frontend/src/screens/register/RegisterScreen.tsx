import React, { useState, useContext, useEffect } from 'react';
import { Box, Flex } from 'native-base';
import { StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import appRoutes from '../../navigation/appRoutes/index';
import { Button } from '../../components/Button';
import { RegisterContext } from '../../utils/registerContext';
import {
  isUsernameInvalid,
  isPasswordInvalid,
  isEmailInvalid,
} from '../../utils/regex';
import { errorColor, primaryColor } from '../../utils/colors';
const { width: ScreenWidth } = Dimensions.get('screen');

export default function Register({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (isUsernameInvalid(username) && username.length !== 0) {
        setUsernameError('Username is invalid');
      } else {
        setUsernameError('');
      }
    }, 3000);
  }, [username]);

  useEffect(() => {
    setTimeout(() => {
      if (isEmailInvalid(email) && email.length !== 0) {
        setEmailError('Email is invalid');
      } else {
        setEmailError('');
      }
    }, 3000);
  }, [email]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (isPasswordInvalid(password) && password.length !== 0) {
  //       setPasswordError('Password is invalid');
  //     } else {
  //       setPasswordError('');
  //     }
  //   }, 3000);
  // }, [password]);

  const { user, setUser } = useContext(RegisterContext);

  const isInputInValid =
    username.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    usernameError.length !== 0 ||
    emailError.length !== 0 ||
    passwordError.length !== 0;

  const register = async () => {
    setUser({
      username: username,
      credentials: {
        local: { email: email, password: password, emailVerified: false },
      },
    });
    navigation.navigate(appRoutes.REGISTER_PHONE_SCREEN);
  };

  return (
    <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
      <Box>
        <TextInput
          value={username}
          style={[
            styles.input,
            usernameError.length !== 0 && styles.inputError,
          ]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Username"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          value={email}
          style={[styles.input, emailError.length !== 0 && styles.inputError]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Email"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          value={password}
          style={[
            styles.input,
            passwordError.length !== 0 && styles.inputError,
          ]}
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
        <Box
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          style={{
            opacity: isInputInValid ? 0.6 : 1,
          }}
        >
          <Button
            onPress={register}
            text={'Next'}
            icon={'arrow-right-alt'}
            inversed={true}
            disable={isInputInValid}
            background={primaryColor}
          />
        </Box>
        <Box my={4} alignItems={'center'}>
          <TouchableOpacity
            onPress={() => navigation.navigate(appRoutes.LOGIN_SCREEN)}
          >
            <Text style={styles.registerTextStyle}>Already an account ?</Text>
          </TouchableOpacity>
        </Box>
        <Box justifyContent={'center'} alignItems={'center'}>
          <Text style={{ color: errorColor }}>{usernameError}</Text>
          <Text style={{ color: errorColor }}>{emailError}</Text>
          <Text style={{ color: errorColor }}>{passwordError}</Text>
          <Text style={{ color: errorColor }}>{error}</Text>
        </Box>
      </Box>
    </Flex>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
  },
  inputError: {
    borderColor: errorColor,
  },
  inputStyle: { fontSize: 16 },
  labelStyle: { fontSize: 14, color: 'gray' },
  placeholderStyle: { fontSize: 16, color: 'gray' },
  textErrorStyle: { fontSize: 16, color: errorColor },
  registerTextStyle: {
    color: '#acabb0',
  },
});
