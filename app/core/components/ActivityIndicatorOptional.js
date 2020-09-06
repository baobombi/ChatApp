import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const ActivityIndicatorOptional = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActivityIndicatorOptional;
