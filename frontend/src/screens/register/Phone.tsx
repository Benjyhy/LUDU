import { Box, Flex, Spacer } from "native-base";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import appRoutes from "../../navigation/appRoutes/index";
import { Button } from "../../components/Button";
import { Icon } from "react-native-elements";
const { width: ScreenWidth } = Dimensions.get("screen");

export default function Phone({ navigation }: any) {
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  // const goBack = () => navigation.goBack();
  const Register = () => {
    navigation.navigate(appRoutes.REGISTER_AVATAR_SCREEN);
    console.log("in")
    try {
      // here place your signup logic
      console.log("user successfully signed up! ");
    } catch (err) {
      console.log("error signing up: ", err);
    }
  };

  return (
    <Flex flex={1}>
      <Flex height={"16"} pt={"10"} pl={"4"} direction={"row"}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "transparent" }}
        >
          <Icon size={24} name={"arrow-back"} />
        </TouchableOpacity>
      </Flex>
      <Flex flex={4} justifyContent={"center"} alignItems={"center"}>
        <Box mb={"4"}>
          <Text>Please register your phone and your postal address</Text>
        </Box>
        <Box>
          <TextInput
            value={phone}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Phone"
            placeholder="+33618273625"
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
            placeholder="+33618273625"
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
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Postcode"
            placeholder="78600"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setPostcode(text);
            }}
          />
          <Box justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Button
              onPress={Register}
              text={"Next"}
              icon={"arrow-right-alt"}
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
    backgroundColor: "white",
    shadowColor: "#000",
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
    color: "#acabb0",
  },
});
