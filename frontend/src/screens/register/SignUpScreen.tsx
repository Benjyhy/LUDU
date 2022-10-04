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
const { width: ScreenWidth } = Dimensions.get("screen");
import { API_URL } from "@env";

export default function Register({ navigation }: any) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const register = () => {
    navigation.navigate(appRoutes.SIGNUP_PHONE_SCREEN);
    try {
      console.log(API_URL)
      console.log("user successfully signed up! ");
    } catch (err) {
      console.log("error signing up: ", err);
    }
  };

  return (
    <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
      <Box>
        <TextInput
          value={username}
          style={styles.input}
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
        <Box justifyContent={"flex-end"} alignItems={"flex-end"}>
          <Button
            onPress={register}
            text={"Next"}
            icon={"arrow-right-alt"}
            inversed={true}
          />
        </Box>
        <Box my={4} alignItems={"center"}>
          <TouchableOpacity
            onPress={() => navigation.navigate(appRoutes.LOGIN_SCREEN)}
          >
            <Text style={styles.registerTextStyle}>Create an account</Text>
          </TouchableOpacity>
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
