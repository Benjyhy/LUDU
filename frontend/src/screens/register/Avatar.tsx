import React, { useState, useContext } from 'react';
import { Box, Flex } from 'native-base';
import { StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import appRoutes from '../../navigation/appRoutes/index';
import { Button } from '../../components/Button';
import { Icon } from 'react-native-elements';
import { RegisterContext } from '../../utils/registerContext';
const { width: ScreenWidth } = Dimensions.get('screen');

export default function Avatar({ navigation }: any) {
  const [avatar, setAvatar] = useState<string>('');
  const { user, setUser } = useContext(RegisterContext);
  console.log(user);
  const Register = () => {
    navigation.navigate(appRoutes.TAB_NAVIGATOR);
    try {
      // here place your signup logic
      console.log('user successfully signed up! ');
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };

  return (
    <Flex flex={1}>
      <Flex height={'16'} pt={'10'} pl={'4'} direction={'row'}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'transparent' }}
        >
          <Icon size={24} name={'arrow-back'} />
        </TouchableOpacity>
      </Flex>
      <Flex flex={4} justifyContent={'center'} alignItems={'center'}>
        <Box mb={'4'}>
          <Text>Add an avatar to your profile</Text>
        </Box>
        <Box>
          <TextInput
            value={avatar}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Username"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setAvatar(text);
            }}
          />
          <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
            <Button
              onPress={Register}
              text={'Next'}
              icon={'arrow-right-alt'}
              inversed={true}
            />
          </Box>
        </Box>
      </Flex>
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
  },
  inputStyle: { fontSize: 16 },
  labelStyle: { fontSize: 14 },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  registerTextStyle: {
    color: '#acabb0',
  },
});
