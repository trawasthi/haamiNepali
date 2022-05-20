import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { auth, db, storage } from "../Firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const NewComponent = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const component = () => {
    const imageRef = ref(storage, "IMG_6763.jpg");
    getDownloadURL(imageRef).then((url) => {
      setImageUrl(url);
    });
    console.log(imageUrl);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={component}>
        <Text>Press me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewComponent;
