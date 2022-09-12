import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export const InlineTextIcon = ({ text, icon }: any) => {
  return (
    <TouchableOpacity style={styles.inlineText}>
      <Icon size={16} name={icon} />
      <Text style={{marginLeft:8}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inlineText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
