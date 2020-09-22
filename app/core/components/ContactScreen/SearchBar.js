import React, { useState } from "react";
import {
  View,
  TextInput,
  UIManager,
  LayoutAnimation,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from "react-native";
import { height, width } from "../../constants/HeightWidthDevice";

const SearchBar = (props) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [hasFocus, setHasFocus] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { inputStyle, container } = styles;
  const inputStyleCollection = [inputStyle];
  const searchBarFocus = [container];

  const myTextInput = React.createRef();

  const clearText = () => {
    myTextInput.current.clear();
    onChangeTextHandle("");
  };
  const onChangeTextHandle = (text) => {
    props.onChangeText(text);
    setIsEmpty(text === "");
  };
  const onFocus = () => {
    if (UIManager.configureNextLayoutAnimation) {
      LayoutAnimation.easeInEaseOut();
    }

    setHasFocus(true);
  };
  const onBlur = () => {
    if (UIManager.configureNextLayoutAnimation) {
      LayoutAnimation.easeInEaseOut();
    }

    setHasFocus(false);
  };
  const focus = () => {
    myTextInput.current.focus();
  };
  const blur = () => {
    myTextInput.current.blur();
  };
  const cancel = () => {
    clearText();
    blur();
  };
  if (hasFocus) {
    inputStyleCollection.push({ flex: 1 });
  }

  return (
    <TouchableWithoutFeedback onPress={cancel} style={props.style}>
      <Animated.View style={searchBarFocus}>
        <View style={styles.leftIconStyle}>
          <Text>🔍</Text>
        </View>
        <TextInput
          ref={myTextInput}
          autoCorrect={false}
          onFocus={onFocus}
          onBlur={onBlur}
          style={inputStyleCollection}
          placeholder={props.searchPlaceholder}
          onChangeText={(text) => onChangeTextHandle(text)}
        />
        <View style={styles.rightContainer}>
          {hasFocus && showLoader ? (
            <ActivityIndicator
              key="loading"
              style={activityIndicator}
              color="#515151"
            />
          ) : (
            <View />
          )}
          {hasFocus && !isEmpty ? (
            <TouchableOpacity onPress={clearText}>
              <View style={styles.rightIconStyle}>
                <Text style={{ fontSize: 20 }}>ⅹ</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: height * 0.05,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  leftIconStyle: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: "row",
  },
  inputStyle: {
    alignSelf: "center",
    marginLeft: 5,
    height: 40,
    fontSize: 18,
  },
  rightIconStyle: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 15,
  },
});
export default SearchBar;
