import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height } from "../../constants/HeightWidthDevice";
const Header = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={props.source} />
      </View>
      <Text>Contact</Text>
      <Ionicons name="add" size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.055,
    backgroundColor: "white",
    //backgroundColor: 'red',
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
export default Header;
