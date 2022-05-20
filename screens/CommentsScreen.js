import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Comments from "../components/home/Comments";
import { auth, db } from "../Firebase";
import { onSnapshot, doc, orderBy, collection } from "firebase/firestore";
import AddComment from "../components/home/AddComment";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const CommentsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      orderBy("creatd"),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
        );
        if (loading) {
          setLoading(false);
        }
      }
    );
    return unsub;
  }, []);

  return (
    <View>
      {posts.map((post, index) => (
        <AddComment post={post} key={index} />
      ))}
      <ScrollView>
      {posts.map((post, index) => (
        <Comments post={post} key={index} navigation={navigation} />
      ))}
      </ScrollView>

      <Divider />
    </View>
  );
};

export default CommentsScreen;
