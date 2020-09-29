import React from "react";

import Icon from "react-native-vector-icons/Ionicons";
// import Colors from '../../constants/Colors'
import { View, StyleSheet, Platform,TouchableOpacity, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
const IconHeader = (props) => {
  return (
    <TouchableOpacity style={[styles.viewButton,{backgroundColor: props.backgroundColor}]} onPress={props.onTapped}>
      <Icon
        name={props.name}
        onPress={props.onTapped}
        size={30}
        color={Platform.OS === "android" ? "white" : "white"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewButton: {
    //backgroundColor: "white",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    width: 0.13 * width,
  },
});
export default IconHeader;
