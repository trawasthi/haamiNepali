import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

const user = auth.currentUser;

const AddComment = ({post}) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState([]);
  const [comment, setComment] = useState(null);

  const getUserDetails = () => {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.email),
      (doc) => {
        setCurrentLoggedInUser({
          fullname: doc.data().fullname,
          profile_picture: doc.data().profile_picture,
        });
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleComment = () => {
    updateDoc(doc(db, "posts", post.id), {
      comments: arrayUnion({
        image: currentLoggedInUser.profile_picture,
        user: currentLoggedInUser.fullname,
        comment: comment,
      }),
    });
  };

  // const handleLike = (post) => {
  //   const currentLikeStatus = !post.likes.includes(user.email);
  //   updateDoc(doc(db, "posts", post.id), {
  //     likes: currentLikeStatus
  //       ? arrayUnion(user.email)
  //       : arrayRemove(user.email),
  //   });
  // };

  return (
    <View style={styles.container}>
      <View>
        {currentLoggedInUser.profile_picture != null ? (
          <Image
            style={styles.imageIcon}
            source={{ uri: currentLoggedInUser.profile_picture }}
          />
        ) : (
          <Image
            style={[styles.imageIcon, { tintColor: "grey" }]}
            source={require("../../assets/profileIcon.png")}
          />
        )}
      </View>
      <TextInput
        placeholder="Add a comment"
        autoCapitalize="none"
        multiline={true}
        //autoFocus={true}
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={styles.textInput}
      />
      {!comment ? (
        <Text style={styles.sendButtonDisabled}>Send</Text>
      ) : (
        <TouchableOpacity onPress={handleComment}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 25,
    marginVertical: 5,
  },
  commentContainer: {},
  imageIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  textInput: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "lightgrey",
    marginVertical: 5,
    width: 250,
    maxHeight: 100,
  },
  sendButton: {
    color: "#1267E9",
    fontWeight: "bold",
  },
  sendButtonDisabled: {
    color: "grey",
    fontWeight: "bold",
  },
});
