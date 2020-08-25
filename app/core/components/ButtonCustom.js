import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Color';
const {width} = Dimensions.get('screen');

const ButtonCustom = (props) => {

  return (
    <TouchableOpacity onPress={() => props.onPressButton} style={styles.container}>
      <Text style={styles.textStyle}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(141, 238, 238)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.5,
    height: '100%',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    opacity: 0.8,
  },
});
export default ButtonCustom;
