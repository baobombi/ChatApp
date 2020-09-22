import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Animated,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { width } from "../../constants/HeightWidthDevice";

import Feather from "react-native-vector-icons/Feather";
const ListItem = (props) => {
  //console.log(props.title)
  const Component =
    props.onPress || props.onLongPress ? TouchableHighlight : View;

  const renderRightAction = (iconName, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
    });
    const pressHandler = () => {
      const { onDelete } = props;
      if (onDelete) {
        onDelete();
      }
    };
    return (
      <Animated.View
        style={{
          flexDirection: "row",
          flex: 1,
          transform: [{ translateX: trans }],
        }}
      >
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Feather name={iconName} size={20} color="white" />
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = (progress) => (
    <View style={{ width: 75, flexDirection: "row" }}>
      {renderRightAction("trash-2", "#ef5350", 64, progress)}
    </View>
  );
  return (
    <Swipeable friction={1} renderRightActions={renderRightActions}>
      <Component
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        disabled={props.disabled}
        underlayColor="#f2f3f5"
      >
        <View style={styles.container}>
          {props.leftElement ? (
            <View style={styles.leftElementContainer}>{props.leftElement}</View>
          ) : (
            <View />
          )}
          <View style={styles.rightSectionContainer}>
            <View style={styles.mainTitleContainer}>
              <Text style={styles.titleStyle}>{props.title}</Text>
              {props.description ? (
                <Text style={styles.descriptionStyle}>{props.description}</Text>
              ) : (
                <View />
              )}
            </View>
            <View style={styles.rightTextContainer}>
              {props.rightText ? <Text>{props.rightText}</Text> : <View />}
            </View>
          </View>
        </View>
      </Component>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 44,
    height: 63,
    backgroundColor: "white",
  },
  leftElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    paddingLeft: 13,
    //backgroundColor: "green",
  },
  rightSectionContainer: {
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#515151",
    marginLeft: 18,
  },
  mainTitleContainer: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    //backgroundColor:'red'
  },
  descriptionStyle: {
    fontSize: 14,
    color: "#515151",
  },
  titleStyle: {
    fontSize: 16,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
export default ListItem;
