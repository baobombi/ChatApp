import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  ColorPropType,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import * as authActions from "../../core/store/actions/auth";
const { height, width } = Dimensions.get("window");
const SplashScreen = (props) => {
  const dispatch = useDispatch();
  //const [colorChange, setColorChange] = useState(Colors.default);
  const [colorChange, setColorChange] = useState(new Animated.Value(0));

  Animated.timing(colorChange, {
    toValue: 1,
    duration: 2500,
    useNativeDriver: false,
  }).start();
  const colorChanged = colorChange.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(141, 238, 238)", "rgb(0,0,0)"],
  });
  const iconColorChange = colorChange.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255, 255, 255)", "rgb(121,178,89)"],
  });

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, name, email, expiryDate } = transformedData;
      const newExpriryDate = new Date(expiryDate);
      if (newExpriryDate <= new Date() || !token || !userId) {
        return;
      }
      //console.log(new Date().getTime());
      const exTime = newExpriryDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, exTime));
      props.navigation.navigate("TabNavigator");
    };
    tryLogin();
    return () => {};
  }, [dispatch]);
  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colorChanged }]}
    >
      <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
        <StatusBar barStyle="light-content" />
        <Animatable.Text
          style={styles.topText}
          animation="bounceInUp"
          duration={1000}
        >
          Welcome
        </Animatable.Text>
        <Animatable.View
          duration={1500}
          animation="bounceInUp"
          style={styles.imageView}
        >
          <Image
            style={styles.image}
            source={require("../../core/assets/logo.png")}
          />
          <Text style={styles.textTaxi}>Chat App</Text>
          <Text style={styles.textGet}>Get started now</Text>
        </Animatable.View>
        <Animatable.View
          duration={2000}
          animation="bounceInUp"
          style={[styles.iconView, { backgroundColor: iconColorChange }]}
        >
          <TouchableOpacity
            style={styles.iconViewStyle}
            onPress={() => props.navigation.navigate("LoginNavigator")}
          >
            <AntDesign name="arrowright" size={30} />
          </TouchableOpacity>
        </Animatable.View>
      </SafeAreaView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  topText: {
    fontSize: width * 0.06,
    color: "white",
    fontWeight: "bold",
  },
  imageView: {
    height: height * 0.6,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: height * 0.7 * 0.4,
    width: height * 0.7 * 0.4,
    resizeMode: "stretch",
  },
  textTaxi: {
    marginTop: 15,
    fontSize: width * 0.09,
    color: "white",
    fontWeight: "bold",
  },
  textGet: {
    marginTop: 15,
    opacity: 0.8,
    fontSize: width * 0.045,
    color: "white",
  },
  iconView: {
    height: height * 0.1,
    width: width * 0.22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  iconViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.12,
    width: width * 0.27,
  },
});

export default SplashScreen;
