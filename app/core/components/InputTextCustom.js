import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const FIRST_INPUT_CHANGE = 'FIRST_INPUT_CHANGE';
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

const InputTextCustom = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: '',
    touched: false,
  });
  useEffect(() => {
    props.onInputChange(props.id, inputState.value, inputState.isValid);
  }, [inputState, props.onInputChange, props.id]);

  const textChangeHandler = (text) => {
    //console.log(text);
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };
  return (
    <View style={[props.styles, styles.viewStyle]}>
      <TextInput {...props} onChangeText={(text) => textChangeHandler(text)} />
    </View>
  );
};

const styles = StyleSheet.create({
  underLine: {
    borderWidth: 1,
    borderColor: 'black',
  },
  viewStyle: {
    flex: 1,
  },
});
export default InputTextCustom;
