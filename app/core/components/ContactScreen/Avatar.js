import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Avatar = (props) => {
  //console.log(props.img)
  const renderImage = () => {
    const { img, width, height, roundedImage } = props;
    const { imageContainer, image } = styles;
    const viewStyle = [imageContainer];
    viewStyle.push({ borderRadius: Math.round(width + height) / 2 });
    return (
      <View style={viewStyle}>
        <Image style={image} source={img} />
      </View>
    );
  };

  const renderPlaceholder = () => {
    //console.log('da di vao dat')
    const { placeholder, width, height, roundedPlaceholder } = props;
    const viewStyle = [styles.placeholderContainer];

    viewStyle.push({ borderRadius: Math.round(width + height) / 2 });

    return (
      <View style={viewStyle}>
        <Text style={styles.placeholderText}>{placeholder}</Text>
      </View>
    );
  };
  return (
    <View
      style={[styles.container, { width: props.width, height: props.height }]}
    >
      {props.img ? renderImage() : renderPlaceholder()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    //backgroundColor: "green",
  },
  imageContainer: {
    overflow: "hidden",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dddddd",
    height: "100%",
  },
  placeholderText: {
    fontWeight: "700",
    color: "#ffffff",
  },
});
export default Avatar;
