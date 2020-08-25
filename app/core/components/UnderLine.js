import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
const UnderLine = (props) => {
  return <View style={styles.underLine}></View>;
};

const styles = StyleSheet.create({
  underLine: {
    borderWidth: 1,
    opacity: 0.2,
    width: width * 0.78,
    alignSelf: 'center',
  },
});
export default UnderLine;
