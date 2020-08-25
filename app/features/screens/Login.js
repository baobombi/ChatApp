import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  View,
  Text,
} from 'react-native';

//Font, Icon...
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontiso from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Components
import Colors from '../../core/constants/Color';
import UnderLine from '../../core/components/UnderLine';
import InputTextCustom from '../../core/components/InputTextCustom';
import ButtonCustom from '../../core/components/ButtonCustom';
const {height, width} = Dimensions.get('screen');
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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
const Login = (props) => {
  //Properties
  const [logoAnime, setLogoAnime] = useState(new Animated.Value(0));
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoAnime, {
        toValue: 1,
        tension: 2,
        friction: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(),
    ]);
  }, []);

  const testConfig = () => {
    console.log(formState.inputValues.email),
      console.log(formState.inputValues.password);
  };
  return (
    <View style={styles.container}>
      {/* First */}
      <ImageBackground
        source={require('../../core/assets/loginBg.png')}
        style={{width: '100%', height: '100%', flex: 1}}
        resizeMode="cover">
        <View style={styles.top}>
          <Image
            source={require('../../core/assets/logo.png')}
            style={styles.imageStyle}
          />
        </View>
        {/* Last */}
        <View style={styles.middle}>
          <View style={styles.register}>
            <TouchableOpacity style={styles.regText}>
              <Text style={[styles.regText, {fontSize: 20}]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.regText}>
              <Text style={styles.regText}>
                <AntDesign size={20} name="right" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form area */}
        <View style={styles.formArea}>
          <View style={{alignSelf: 'center'}}>
            <Image source={require('../../core/assets/chat.png')} />
          </View>
          <View style={styles.formInput}>
            <View style={styles.inputStyle}>
              <View style={styles.iconStyle}>
                <Fontiso name="email" size={25} />
              </View>
              <InputTextCustom
                style={styles.textInput}
                placeholder="Enter your email..."
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                id="email"
                errorText="Please enter a email!"
                required
                Login
                onInputChange={inputChangeHandler}
              />
            </View>
            <UnderLine />
            <View style={styles.inputStyle}>
              <View style={styles.iconStyle}>
                <FontAwesome name="lock" color={Colors.default} size={25} />
              </View>
              <InputTextCustom
                style={styles.textInput}
                Login
                secureTextEntry={true}
                id="password"
                placeholder="Enter your password..."
                autoCapitalize="none"
                returnKeyType="next"
                errorText="Please enter a password"
                initialValue=""
                required
                onInputChange={inputChangeHandler}
              />
            </View>
            <UnderLine />
          </View>
          <View style={styles.buttonView}>
            <ButtonCustom name="Login" onPressButton={testConfig}/>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: height * 0.02,
  },
  top: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    height: height * 0.28,
    marginTop: 10,
  },
  imageStyle: {
    height: height * 0.215,
    width: width * 0.465,
    marginTop: height * 0.06,
  },
  middle: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingHorizontal: width * 0.085,
    zIndex: 5,
  },
  register: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: height * 0.04,
  },
  regText: {
    fontWeight: 'normal',
    color: Colors.textColor,
  },
  formArea: {
    marginHorizontal: width * 0.06,
    height: height * 0.5,
    borderRadius: 10,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  formInput: {
    marginTop: height * 0.03,
    height: height * 0.2,
    width: '100%',
    padding: 5,
    justifyContent: 'center',
  },
  inputStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 20,
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.08,
    marginTop: 1,
    height: 45,
  },
  textInput: {
    marginLeft: 10,
  },
  buttonView: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
});
export default Login;
