import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import Header from "../../../core/components/ContactScreen/Header";
import Avatar from "../../../core/assets/lego.png";
const Contact = () => {
  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Header source={Avatar} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
  },
});
export default Contact;
