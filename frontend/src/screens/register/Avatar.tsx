import React, { useState, useContext } from 'react';
import { Box, Flex } from 'native-base';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Spinner } from 'native-base';
import appRoutes from '../../navigation/appRoutes/index';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/actions/userAction';
import { Button } from '../../components/Button';
import { Icon } from 'react-native-elements';
import { RegisterContext } from '../../utils/registerContext';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import axios from '../../utils/axios';
import { primaryColor } from '../../utils/colors';
const { width: ScreenWidth } = Dimensions.get('screen');

export default function Avatar({ navigation }: any) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(RegisterContext);
  const dispatch = useDispatch();
  // const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const register = async () => {
    setLoading(true);
    const newUser = { ...user, ...{ role: 'USER', avatar: image } };
    try {
      const res = await axios.post('/local/register', newUser);
      const token = res.data.user.token;
      const id = res.data.user._id;
      const username = res.data.user.username;
      const avatar = res.data.user.avatar;
      const role = res.data.user.role;
      const email = res.data.user.credentials.local.email;
      dispatch(setUser({ token, id, username, avatar, role, email }));
    } catch (err: any) {}
    setLoading(false);
    navigation.navigate(appRoutes.TAB_NAVIGATOR);
  };

  const HandleImageSelect = () => {
    const pickImage = async () => {
      setPreview(null);
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        const { uri, base64 } = result as ImageInfo;
        setImage(base64);
        setPreview(uri);
      }
    };
    return (
      <Flex m={4} justifyContent={'center'} alignItems={'center'} height={250}>
        {!preview && (
          <Button
            onPress={pickImage}
            text={'Pick an image'}
            background={'white'}
            icon={'perm-media'}
          />
        )}
        {preview && (
          <>
            <Image
              source={{ uri: preview }}
              style={{ width: 200, height: 200, marginBottom: 4 }}
            />
            <Button
              onPress={pickImage}
              text={'Select an other'}
              background={'white'}
              icon={'perm-media'}
            />
          </>
        )}
      </Flex>
    );
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
        {!loading && (
          <>
            <Box mb={'4'}>
              <Text>Add an avatar to your profile</Text>
            </Box>
            <HandleImageSelect />
            <Box
              justifyContent={preview ? 'center' : 'flex-end'}
              alignItems={preview ? 'center' : 'flex-end'}
              style={{
                width: '100%',
              }}
            >
              {preview && (
                <Button
                  onPress={register}
                  text={'Valider'}
                  inversed={true}
                  background={primaryColor}
                />
              )}
              {!preview && (
                <Button
                  onPress={register}
                  text={'Later'}
                  icon={'arrow-right-alt'}
                  inversed={true}
                  background={primaryColor}
                />
              )}
            </Box>
          </>
        )}
        {loading && (
          <>
            <Spinner />
          </>
        )}
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
