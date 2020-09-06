import React from "react";
import {
  Platform,
  Dimensions,
  Image,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  Text,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import Colors from "../core/constants/Color";
//Add Screen
import LoginScreen from "./screens/Auth/Login";
import SplashScreen from "./screens/SplashScreen";
import Signup from "./screens/Auth/Singup";
import ChatRoomScreen from "./screens/Chat/ChatRoom";
const { width, height } = Dimensions.get("screen");

const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.default : Colors.default,
  },
  headerTintColor: Platform.OS === "android" ? "white" : "white",
};
const LoginNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: Signup,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const ChatRoomNavigator = createStackNavigator(
  {
    ChatRoomScreen: {
      screen: ChatRoomScreen,
      navigationOptions: {
        headerShown: "false",
      },
    },
  },
  {
    initialRouteName: "ChatRoomScreen",
    defaultNavigationOptions: defaultNavOptions,
  }
);
const ChatNavigator = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    LoginNavigator: LoginNavigator,
    ChatRoomNavigator: ChatRoomNavigator,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
export default createAppContainer(ChatNavigator);
