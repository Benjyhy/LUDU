import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { InlineTextIcon } from "./InlineTextIcon";

export const Button = (props: any) => {
  // normalText | whiteTheme
  // const style = props.normalText ? { fontWeight: 'bold', fontSize: 15, fontFamily: undefined } : {}
  return (
    <TouchableOpacity style={{ ...styles.button }} onPress={props.onPress}>
      {props.icon ? (
        <InlineTextIcon icon={props.icon} text={props.text} />
      ) : (
        <Text
          style={{ ...styles.text }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {props.text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 40,
    width: 140,
    borderRadius: 8,
    borderEndWidth: 2,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontFamily: "bold",
  },
});
