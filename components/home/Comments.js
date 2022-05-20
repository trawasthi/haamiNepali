import { View, ScrollView, Image, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../../Firebase";
import { onSnapshot, doc } from "firebase/firestore";

const Comments = ({ post, comment }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState([]);

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

  return (
    <View >
      <ScrollView>
        <View style={{ width: '80%'}}>
          {post.comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                {comment.image != null ? (
                  <Image
                    source={{ uri: comment.image }}
                    style={styles.profile}
                  />
                ) : (
                  <Image
                    source={require("../../assets/profileIcon.png")}
                    style={[styles.profile, { tintColor: "grey" }]}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontWeight: "bold",
                    color: "#1267E9",
                  }}
                >
                  {comment.user}
                </Text>
              </TouchableOpacity>

              <View style={{ marginRight: 10 }}>
                {/* <ScrollView>
                {posts.map((post, index) => (
                  <Post post={post} key={index} navigation={navigation} />
                ))}
              </ScrollView> */}
                <Text style={{ fontWeight: "normal", color: "black" }}>
                  {comment.comment}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginLeft: 10,
  },
});
