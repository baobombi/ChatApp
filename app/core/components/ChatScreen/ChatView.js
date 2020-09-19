import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { height, width } from "../../constants/HeightWidthDevice";
const ChatView = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.left}>
        <Image source={props.avatar} style={styles.avatarStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.right}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.chatMsg}>Im a dev, subcriber now</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  left: {
    flex: 1,
    borderRadius: (width * 0.08) / 2,
    overflow: "hidden",
    bottom: 0,
  },
  right: {
    flex: 9,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    padding: 10
  },
  name: {
    color: "#95989A",
    marginBottom: 3,
    fontSize: 12,
  },
  chatMsg: {
    fontSize: 16,
    color: "#2E2D2C",
  },
  avatarStyle: {
    resizeMode: "contain",
    height: width * 0.08,
    width: width * 0.08,
    bottom: 0,
    alignSelf: "center",
    position: "absolute",
  },
});
export default ChatView;
