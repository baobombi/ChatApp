import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height } from "../../constants/HeightWidthDevice";
import Colors from "../../constants/Color";
const Header = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={props.source} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>Contact</Text>
      <TouchableOpacity onPress={props.addNewContact}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.055,
    backgroundColor: Colors.headerColor,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
export default Header;
