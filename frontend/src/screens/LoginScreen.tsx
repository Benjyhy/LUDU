import { Box, Spacer } from 'native-base';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import appRoutes from '../navigation/appRoutes/index';
import { Button } from '../components/Button';

const { width: ScreenWidth } = Dimensions.get('screen');

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const login = () => {
    // navigation.navigate(appRoutes.TAB_NAVIGATOR);
    try {
      console.log(email);
      console.log(password);
      // here place your signup logic
      console.log('user successfully Login! ');
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
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
      <Button onPress={login} text={'Login'} />
      <Box my={4}>
        <TouchableOpacity
          onPress={() => navigation.navigate(appRoutes.REGISTER_SCREEN)}
        >
          <Text style={styles.registerTextStyle}>Create an account</Text>
        </TouchableOpacity>
      </Box>
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
