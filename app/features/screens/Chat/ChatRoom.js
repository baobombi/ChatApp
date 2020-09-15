import React, { createRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import IconHeader from "../../../core/components/ChatScreen/IconHeader";
import Add from ".././../../core/assets/add.png";
import Lego from ".././../../core/assets/lego.png";
import ChatView from "../../../core/components/ChatScreen/ChatView";
import Entypo from "react-native-vector-icons/Entypo";
export const { height, width } = Dimensions.get("screen");
const ChatRoom = (props) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Bot Skills",
      msgId: "123123sad",
    },
    {
      id: 2,
      name: "abc",
      msgId: "www",
    },
  ]);
  //console.log(data)
  //properties
  const textInput = createRef();
  const flatList = createRef();

  //func

  const updateInput = (text) => {};
  const submitMsg = () => {};
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"height"}
        keyboardVerticalOffset={80}
      >
        <View style={styles.content}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ChatView
                name={item.name}
                avatar={Lego}
                height={height}
                width={width}
              />
            )}
            keyExtractor={(item) => item.msgId}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.textInputViewStyle}>
            <TextInput
              placeholderTextColor="#2E2D2C"
              //multiline={true}
              placeholder="Type something"
              onChangeText={(text) => updateInput(text)}
              onSubmitEditing={() => submitMsg()}
              clearButtonMode={"always"}
              autoCorrect={false}
              style={styles.textInputStyles}
            />
          </View>

          <TouchableOpacity
            //onPress={() => this.submitMsg()}
            style={styles.addButton}
          >
            {/* <Image source={Add} onPress={() => this.submitMsg()} /> */}
            <Entypo name="direction"  color="#FB1963" size={30}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {},
  footer: {
    //backgroundColor: "green",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    height: height * 0.1,
    width: width,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textInputViewStyle: {
    flex: 9,
    backgroundColor: "#E6E6E6",
    height: (height * 0.1) / 2,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  textInputStyle: {
    fontSize: 16,
    height: 30,
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginLeft: 5,
    //backgroundColor: "green",
  },
});
ChatRoom.navigationOptions = (navData) => {
  return {
    headerTitle: "Chat Room",
    headerLeft: () => (
      <IconHeader
        left
        name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onTapped={() => {
          // navData.navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => (
      <IconHeader
        right
        name={
          Platform.OS === "android"
            ? "ios-close-circle-outline"
            : "ios-close-circle-outline"
        }
        onTapped={() => {
          // navData.navigation.toggleDrawer();
        }}
      />
    ),
    // headerBackTitle: "戻り",
  };
};
export default ChatRoom;
