import React, { useState, useContext, useEffect } from 'react';
import { Box, Flex } from 'native-base';
import { StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import appRoutes from '../../navigation/appRoutes/index';
import { Button } from '../../components/Button';
import { Icon } from 'react-native-elements';
import { RegisterContext } from '../../utils/registerContext';
import { isValidPhonenumber, isZipCodeValide } from '../../utils/regex';
import { errorColor, primaryColor } from '../../utils/colors';
const { width: ScreenWidth } = Dimensions.get('screen');

export default function Phone({ navigation }: any) {
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [zipError, setZipError] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      if (!isValidPhonenumber(phone) && phone.length !== 0) {
        setPhoneError('Phone is invalid');
      } else {
        setPhoneError('');
      }
    }, 3000);
  }, [phone]);

  useEffect(() => {
    setTimeout(() => {
      if (isZipCodeValide(postcode) && postcode.length !== 0) {
        setZipError('PostCode is invalid');
      } else {
        setZipError('');
      }
    }, 3000);
  }, [postcode]);

  const isInputInValid =
    phone.length === 0 ||
    address.length === 0 ||
    city.length === 0 ||
    postcode.length === 0 ||
    phoneError.length !== 0 ||
    zipError.length !== 0;

  const { user, setUser } = useContext(RegisterContext);
  const register = () => {
    const userProperties = {
      phone: phone,
      address: address,
      city: city,
      postCode: postcode,
    };
    setUser({ ...user, ...userProperties });
    navigation.navigate(appRoutes.REGISTER_AVATAR_SCREEN);
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
          <Text>Please register your phone and your postal address</Text>
        </Box>
        <Box>
          <TextInput
            value={phone}
            style={[styles.input, phoneError.length !== 0 && styles.inputError]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Phone"
            placeholder="0618273625"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setPhone(text);
            }}
          />
          <TextInput
            value={address}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Address"
            placeholder=" 16 rue de Beaumont"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
          <TextInput
            value={city}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="City Address"
            placeholder="Paris"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setCity(text);
            }}
          />
          <TextInput
            value={postcode}
            style={[styles.input, zipError.length !== 0 && styles.inputError]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Postcode"
            placeholder="59000"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setPostcode(text);
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
          <Box justifyContent={'center'} alignItems={'center'}>
            <Text style={{ color: errorColor }}>{phoneError}</Text>
            <Text style={{ color: errorColor }}>{zipError}</Text>
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
