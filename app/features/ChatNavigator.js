import React from "react";
import { Platform, Dimensions } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import Colors from "../core/constants/Color";
//Add Screen
import LoginScreen from "./screens/Auth/Login";
import SplashScreen from "./screens/SplashScreen";
import Signup from "./screens/Auth/Singup";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

//Personal
import MessageScreen from "./screens/PersonalUser/Message";
import ContactScreen from "./screens/PersonalUser/Contact";
import TimeLineScreen from "./screens/PersonalUser/TimeLine";
import OptionalScreen from "./screens/PersonalUser/Optional";
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
        headerTitleStyle: {
          color: "#FB1963",
        },
      },
    },
  },
  {
    initialRouteName: "ChatRoomScreen",
  }
);
const PersonalNavigator = createStackNavigator(
  {
    Message: {
      screen: MessageScreen,
      navigationOptions: {
        headerTitleStyle: {
          color: "#FB1963",
        },
      },
    },
    ChatRoom: ChatRoomNavigator,
    //Contact: ContactScreen,
  },
  {
    //mode: 'modal',
    initialRouteName: "Message",
  }
);
const ContactNavigator = createStackNavigator(
  {
    Contact: {
      screen: ContactScreen,
      navigationOptions: {
        headerShown: false,
        //title: 'abc'
      },
    },
  },
  {
    initialRouteName: "Contact",
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Message: {
      screen: PersonalNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign
              name={Platform.OS === "android" ? "message1" : "message1"}
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign
              name={Platform.OS === "android" ? "contacts" : "contacts"}
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    TimeLine: {
      screen: TimeLineScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon
              name={Platform.OS === "android" ? "time-outline" : "time-outline"}
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "white",
      },
      labelStyle: {},
      activeTintColor: Colors.headerColor,
    },
  }
);
const ChatNavigator = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    LoginNavigator: LoginNavigator,
    TabNavigator: TabNavigator,
    ChatRoomNavigator: ChatRoomNavigator,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
export default createAppContainer(ChatNavigator);
