import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth, db, storage } from "../Firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const thumbnailPic = (
  <Image
    source={require("./../assets/profileIcon.png")}
    style={{ height: 100, width: 100, margin: 10, tintColor: "grey" }}
  />
);

const EditProfileScreen = ({ navigation }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState([]);
  const [fullname, setFullname] = useState(null);
  const [city, setCity] = useState(null);
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const user = auth.currentUser;

  const getUserDetails = () => {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.email),
      (doc) => {
        setCurrentLoggedInUser({
          fullname: doc.data().fullname,
          profile_picture: doc.data().profile_picture,
          city: doc.data().city,
          info: doc.data().info,
        });
      }
    );
    return unsubscribe;
  };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.photo,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleChange = async () => {
    const imageUrl = await uploadImage();
    try {
      const unsub = setDoc(doc(db, "users", user.email), {
        fullname: fullname,
        city: city,
        info: info,
        profile_picture: imageUrl,
      });
      console.log("Profile updated");
      navigation.goBack();
      //Alert.alert("User registered successfully", user.email);
    } catch (error) {
      console.log(error);
    }
    //return unsub;
  };

  // useEffect(() => {
  //   handleChange();
  // }, [])

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    try {
      let filename =
        user.email +
        "/" +
        "profileImages" +
        "/" +
        image.substring(image.lastIndexOf("/") + 1);
      const extension = filename.split(".").pop();
      const name = filename.split(".").slice(0, -1).join(".");
      const imageFilename = name + Date.now() + "." + extension;

      const imageRef = ref(storage, imageFilename);
      const img = await fetch(image);
      const bytes = await img.blob();
      const uploadTask = uploadBytesResumable(imageRef, bytes);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //console.log("Upload is " + progress + "% done");
        setIsLoading(true);
        setPercentage(progress);
      });

      await uploadTask;
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {image != null ? (
              <Image
                source={{ uri: image }}
                style={[styles.logoContainer, styles.selectedPhoto]}
              />
            ) : (
              <View style={styles.logoContainer}>{thumbnailPic}</View>
            )}
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity style={styles.buttonPhoto} onPress={pickImage}>
              <Image
                style={styles.icons}
                source={require("../assets/photoIcon.png")}
              />
              <Text style={styles.textStyle}>Change photo</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TextInput
              placeholder="Full name"
              //defaultValue={currentLoggedInUser.fullname}
              //autoFocus={true}
              value={fullname}
              //autoCapitalize="none"
              onChangeText={(text) => setFullname(text)}
              style={styles.textInput}
              //returnKeyType = {'next'}
            />
            <TextInput
              placeholder="City"
              value={city}
              onChangeText={(text) => setCity(text)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="About me"
              multiline={true}
              autoCapitalize="none"
              value={info}
              onChangeText={(text) => setInfo(text)}
              style={[styles.textInput, { height: 100 }]}
              //onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleChange}
              style={[styles.button, { marginBottom: 200 }]}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "lightgrey",
    marginTop: 10,
    width: 300,
  },
  buttonContainer: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#1267E9",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonUnselected: {
    backgroundColor: "darkgrey",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#1267E9",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonPhoto: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#1267E9",
    marginBottom: 10,
  },
  buttonPhotoUnselected: {
    backgroundColor: "darkgrey",
  },
  selectedPhoto: {
    borderRadius: 50,
    height: 100,
    width: 100,
    margin: 10,
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
