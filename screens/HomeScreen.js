import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home/Header.js";
import Post from "../components/home/Post.js";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from "../Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Divider } from "react-native-elements";
import SkeletonContent from "react-native-skeleton-content";

const HomeScreen = ({ isLoading, navigation }) => {
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
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Divider width={0.25} />
      <CreatePost navigation={navigation} />

      {loading ? (
        <ScrollView>
          <SkeletonContent
            containerStyle={{ flex: 1, width: 300 }}
            isLoading={isLoading}
            layout={[
              {
                key: "highlights1",
                marginHorizontal: 10,
                marginTop: 10,
                width: 110,
                height: 80,
                borderRadius: 5,
              },
              {
                key: "hightlights2",
                marginLeft: 140,
                marginTop: -80,
                width: 110,
                height: 80,
                borderRadius: 5,
              },
              {
                key: "hightlights3",
                marginLeft: 270,
                marginTop: -80,
                width: 110,
                height: 80,
                borderRadius: 5,
              },
              {
                key: "profile_pic",
                marginHorizontal: 10,
                width: 40,
                height: 40,
                marginVertical: 10,
                borderRadius: 20,
              },
              {
                key: "name",
                marginLeft: 60,
                width: 120,
                height: 18,
                marginTop: -48,
                borderRadius: 4,
              },
              {
                key: "date",
                marginLeft: 60,
                width: 50,
                height: 15,
                marginTop: 5,
                borderRadius: 4,
              },
              {
                key: "caption_line_long",
                marginHorizontal: 10,
                marginVertical: 10,
                width: 370,
                height: 15,
                borderRadius: 4,
              },
              {
                key: "caption_line_short",
                marginHorizontal: 10,
                marginTop: -5,
                width: 250,
                height: 15,
                borderRadius: 4,
              },
              {
                key: "post_image",
                marginHorizontal: 10,
                width: 370,
                height: 260,
                marginVertical: 10,
                borderRadius: 5,
              },
              {
                key: "like_button",
                marginHorizontal: 10,
                width: 100,
                height: 36,
                borderRadius: 5,
              },
              {
                key: "comment_button",
                marginLeft: 140,
                marginTop: -36,
                width: 100,
                height: 36,
                borderRadius: 5,
              },
              {
                key: "share_button",
                marginLeft: 280,
                marginTop: -36,
                width: 100,
                height: 36,
                borderRadius: 5,
              },
            ]}
          ></SkeletonContent>
          <SkeletonContent
            containerStyle={{ flex: 1, width: 300 }}
            isLoading={isLoading}
            layout={[
              {
                key: "profile_pic",
                marginHorizontal: 10,
                width: 40,
                height: 40,
                marginVertical: 10,
                borderRadius: 20,
              },
              {
                key: "name",
                marginLeft: 60,
                width: 120,
                height: 18,
                marginTop: -48,
                borderRadius: 4,
              },
              {
                key: "date",
                marginLeft: 60,
                width: 50,
                height: 15,
                marginTop: 5,
                borderRadius: 4,
              },
              {
                key: "caption_line_long",
                marginHorizontal: 10,
                marginVertical: 10,
                width: 370,
                height: 15,
                borderRadius: 4,
              },
              {
                key: "caption_line_short",
                marginHorizontal: 10,
                marginTop: -5,
                width: 250,
                height: 15,
                borderRadius: 4,
              },
              {
                key: "post_image",
                marginHorizontal: 10,
                width: 370,
                height: 260,
                marginVertical: 10,
                borderRadius: 5,
              },
              {
                key: "like_button",
                marginHorizontal: 10,
                width: 100,
                height: 36,
                borderRadius: 5,
              },
              {
                key: "comment_button",
                marginLeft: 140,
                marginTop: -36,
                width: 100,
                height: 36,
                borderRadius: 5,
              },
              {
                key: "share_button",
                marginLeft: 280,
                marginTop: -36,
                width: 100,
                height: 36,
                borderRadius: 5,
              },
            ]}
          ></SkeletonContent>
        </ScrollView>
      ) : (
        <ScrollView>
          {posts.map((post, index) => (
            <Post post={post} key={index} navigation={navigation} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const CreatePost = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("New post");
      }}
    >
      <View style={styles.createPostButton}>
        <Text style={styles.postButtonText}>Create a post</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  createPostButton: {
    height: 40,
    backgroundColor: "#1267E9",
    justifyContent: "center",
    alignItems: "center",
  },
  postButtonText: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 18,
  },
});
export default HomeScreen;
