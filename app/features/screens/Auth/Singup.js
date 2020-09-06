import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
//Font, Icon...
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontiso from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
//Components
import Colors from "../../../core/constants/Color";
import UnderLine from "../../../core/components/UnderLine";
import InputTextCustom from "../../../core/components/InputTextCustom";
import ButtonCustom from "../../../core/components/ButtonCustom";
import ActivityIndicatorOptional from "../../../core/components/ActivityIndicatorOptional";
import * as authActions from "../../../core/store/actions/auth";

const { height, width } = Dimensions.get("screen");
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updateValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updateFormIsValid = true;
      for (const key in updateValidities) {
        updateFormIsValid = updateFormIsValid && updateValidities[key];
      }
      return {
        formIsValid: updateFormIsValid,
        inputValidities: updateValidities,
        inputValues: updateValues,
      };
    default:
      return state;
  }
};
const Singup = (props) => {
  //useEffect
  useEffect(() => {
    if (error) {
      Alert.alert("The username or password is incorrect", error, [
        { text: "OK" },
      ]);
    } else if (isSignUpError) {
      Alert.alert("Notice", isSignUpError, [{ text: "OK" }]);
    }
    return () => {
      setIsSignUpError(null);
      setError(null);
    };
  }, [isSignUpError, error]);

  //Properties
  const [error, setError] = useState("");
  const [isSignUpError, setIsSignUpError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [logoAnime, setLogoAnime] = useState(new Animated.Value(0));
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      cpassword: "",
      name: "",
    },
    inputValidities: {
      email: false,
      password: false,
      name: false,
      cpassword: false,
    },
    formIsValid: false,
  });
  //redux
  const dispatch = useDispatch();
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const registerHandler = useCallback(async () => {
    setError(null);
    if (!formState.formIsValid) {
      Alert.alert("vui long lam lai", "vui long nhap het cac truong", [
        { text: "OK" },
      ]);
      return;
    }
    setIsSignUpError(null);
    setIsLoginLoading(true);
    try {
      await dispatch(
        authActions.register(
          formState.inputValues.email,
          formState.inputValues.password,
          formState.inputValues.cpassword,
          formState.inputValues.name
        )
      );
      props.navigation.navigate("ChatRoomNavigator");
      setIsLoginLoading(false);
    } catch (err) {
      setIsSignUpError(err.message);
      setIsLoginLoading(false);
    }
  }, [dispatch, formState]);

  //

  return (
    <View style={styles.container}>
      {/* First */}
      <ImageBackground
        source={require("../../../core/assets/loginBg.png")}
        style={{ width: "100%", height: "100%", flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.top}>
          <Image
            source={require("../../../core/assets/chat.png")}
            style={styles.imageStyle}
          />
        </View>
        {/* Last */}
        <View style={styles.middle}>
          <View style={styles.register}>
            <TouchableOpacity
              style={styles.regText}
              onPress={() => props.navigation.goBack()}
            >
              <AntDesign size={20} name="left" color={Colors.textColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form area */}
        <View style={styles.formArea}>
          <View style={styles.formInput}>
            <View style={styles.inputStyle}>
              <View style={styles.iconStyle}>
                <Material name="rename-box" size={25} />
              </View>
              <InputTextCustom
                style={styles.textInput}
                autoCorrect={false}
                placeholder="Full Name"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                id="name"
                required
                Login
                onInputChange={inputChangeHandler}
              />
            </View>
            <UnderLine />

            <View style={styles.inputStyle}>
              <View style={styles.iconStyle}>
                <Fontiso name="email" size={25} />
              </View>
              <InputTextCustom
                style={styles.textInput}
                autoCorrect={false}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                id="email"
                required
                Login
                onInputChange={inputChangeHandler}
              />
            </View>
            <UnderLine />
            <View style={styles.inputStyle}>
              <View style={styles.iconStyle}>
                <AntDesign name="key" color={Colors.default} size={25} />
              </View>
              <InputTextCustom
                style={styles.textInput}
                Login
                autoCorrect={false}
                secureTextEntry={true}
                id="password"
                placeholder="Password"
                autoCapitalize="none"
                returnKeyType="next"
                initialValue=""
                required
                onInputChange={inputChangeHandler}
              />
            </View>
            <UnderLine />
            <View style={styles.inputStyle}>
              <View style={styles.iconStyle}>
                <Octicons name="diff-renamed" size={25} />
              </View>
              <InputTextCustom
                style={styles.textInput}
                autoCorrect={false}
                placeholder="Confirm Password"
                secureTextEntry={true}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                id="cpassword"
                required
                Login
                onInputChange={inputChangeHandler}
              />
            </View>
            <UnderLine />
          </View>
          <View style={styles.buttonView}>
            {!isLoginLoading ? (
              <ButtonCustom
                name="Sign Up"
                onPressButton={registerHandler}
                styleProps={styles.buttonValue}
              />
            ) : (
              <ActivityIndicatorOptional />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginTop: height * 0.02,
  },
  top: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: width,
    height: height * 0.28,
    marginTop: 15,
  },
  imageStyle: {
    height: height * 0.14,
    width: "100%",
    resizeMode: "contain",
  },
  middle: {
    flex: 1,
    width: "100%",
    position: "absolute",
    backgroundColor: "transparent",
    paddingHorizontal: width * 0.085,
    zIndex: 5,
  },
  register: {
    flex: 1,
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: height * 0.04,
  },
  regText: {
    fontWeight: "normal",
    color: Colors.textColor,
  },
  formArea: {
    marginHorizontal: width * 0.06,
    height: height * 0.6,
    borderRadius: 10,
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 2,
    backgroundColor: "white",
    alignItems: "center",
  },
  formInput: {
    marginTop: height * 0.01,
    height: height * 0.4,
    width: "100%",
    padding: 5,
    justifyContent: "center",
  },
  inputStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginTop: 20,
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.08,
    marginTop: 1,
    height: 45,
  },
  textInput: {
    marginLeft: 10,
  },
  buttonView: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  buttonValue: {
    backgroundColor: "rgb(141, 238, 238)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
    height: "100%",
  },
  formBottom: {
    flexDirection: "row",
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.04,
  },
  textStyleBottom: {
    marginLeft: 5,
    fontSize: 15,
    color: Colors.buttonColor,
  },
});
export default Singup;
