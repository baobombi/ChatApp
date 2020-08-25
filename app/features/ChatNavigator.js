import React from 'react';
import {
  Platform,
  Dimensions,
  Image,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  Text,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import Colors from '../core/constants/Color';
//Add Screen
import LoginScreen from './screens/Login';
import SplashScreen from './screens/SplashScreen';
const {width, height} = Dimensions.get('screen');

const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === 'android' ? Colors.default : Colors.default,
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : 'white',
};
const LoginNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  // RegisterScreen: {
  //   screen: RegisterScreen,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
});
const ChatNavigator = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    LoginNavigator: LoginNavigator,
    // Shop: ShopNavigator,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);
export default createAppContainer(ChatNavigator);
