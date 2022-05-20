import React, { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";

//import { storage } from '../../Firebase';

const PhotoUploader = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {image != null ? (
          <Image source={{ uri: image }} style={styles.selectedPhoto} />
        ) : (
          <Image
            style={styles.placeholderImage}
            source={require("../../assets/placeholderIcon.png")}
          />
        )}
      </TouchableWithoutFeedback>
      
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Image
            style={styles.icons}
            source={require("../../assets/photoIcon.png")}
          />
          <Text style={styles.textStyle}>Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default PhotoUploader;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    padding: 10,
    elevation: 2,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1267E9",
    marginVertical: 10,
    //marginBottom: 5,
  },
  placeholderImage: {
    width: 120, 
    height: 120, 
    tintColor: "lightgrey"
  },
  selectedPhoto: {
    width: 120, 
    height: 120,
    //borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius:10
  },

  icons: {
    width: 20,
    height: 20,
    //resizeMode: 'contain',
    tintColor: "white",
  },

  textStyle: {
    color: "white",
    //fontWeight: "bold",
    //textAlign: "center",
    fontSize: 16,
    marginHorizontal: 8,
  },
});
