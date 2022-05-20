import { View, StyleSheet, Alert, Keyboard, Image, Text } from "react-native";
import { React, useEffect, useState } from "react";
import { TextInput } from "react-native";

import * as ImagePicker from "expo-image-picker";
import ChooseCity from "./ChooseCity";

import { auth, db, storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import ChooseCategory from "./ChooseCategory";

const AddNewPost = ({ post, navigation }) => {
  const [caption, setCaption] = useState(null);
  const [image, setImage] = useState(null);
  //const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState(null);
  const [city, setCity] = useState(null);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState([null]);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(null);

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  //const year = new Date().getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const user = auth.currentUser;

  // getting fullname and profile picture
  const getUserDetails = () => {
    const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
      setCurrentLoggedInUser({
        fullname: doc.data().fullname,
        profile_picture: doc.data().profile_picture,
      });
    });
    return unsubscribe;
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  const uploadPost = async () => {
    const imageUrl = await uploadImage();
    console.log(imageUrl);
    try {
      const postRef = doc(collection(db, "posts"));
      const postTask = setDoc(postRef, {
        uid: user.uid,
        imageUrl: imageUrl,
        user: user.email,
        likes: [],
        shares: [],
        caption: caption,
        comments: [],
        fullname: currentLoggedInUser.fullname,
        profile_picture: currentLoggedInUser.profile_picture,
        category: category,
        city: city,
        created: serverTimestamp(Date),
        postedDate: date + " " + months[month],
      });
      navigation.goBack();
      console.log("posted successfully");
      Alert.alert("Posted successfully");
    } catch (e) {
      console.log("Error adding post", e);
    }
  };

  // uploading photo to firebase storage
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    try {
      let filename =
        user.email +
        "/" +
        "postImages" +
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
        //FirebaseStorage.maxUplodRetryTime(60000);
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
    <View>
      <TextInput
        placeholder="Share something..."
        placeholderTextColor="gray"
        multiline={true}
        value={post}
        onChangeText={(text) => setCaption(text)}
        maxLength={2200}
        style={styles.postBox}
      />

      <View style={styles.optionsBar}>
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

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Image
                style={styles.icons}
                source={require("../../assets/photoIcon.png")}
              />
              <Text style={styles.textStyle}>Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ChooseCategory options={(category) => setCategory(category)} />

          <ChooseCity cityOptions={(city) => setCity(city)} />
        </View>
      </View>

      {caption == null && image == null ? (
        <TouchableWithoutFeedback style={styles.postButtonDisabled}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Post
          </Text>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableOpacity style={styles.postButton} onPress={uploadPost}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Post
          </Text>
        </TouchableOpacity>
      )}
      <Text>Uploading {percentage} % done</Text>
    </View>
  );
};

export default AddNewPost;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  postBox: {
    height: 200,
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
    backgroundColor: "white",
    // borderWidth: 0.25,
    // borderColor: 'gray',
    borderRadius: 8,
    padding: 5,
  },
  button: {
    flexDirection: "row",
    padding: 10,
    elevation: 2,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1267E9",
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  // buttonSelected: {
  //   backgroundColor: "darkgrey",
  // },
  placeholderImage: {
    width: 120,
    height: 120,
    tintColor: "lightgrey",
    marginLeft: 10,
  },
  selectedPhoto: {
    width: 150,
    height: 120,
    //borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  icons: {
    width: 20,
    height: 20,
    //resizeMode: 'contain',
    tintColor: "white",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    //textAlign: "center",
    //fontSize: 16,
    marginHorizontal: 8,
  },
  buttonConatiner: {
    width: 225,
    marginLeft: 10,
    marginTop: 10,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
  },
  menubarContainer: {
    width: 225,
    marginHorizontal: 10,
    //marginBottom: -10,
  },

  postButton: {
    backgroundColor: "#1267E9",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 60,
  },
  postButtonDisabled: {
    backgroundColor: "darkgrey",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 60,
  },
  optionsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
