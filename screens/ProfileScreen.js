import { signOut } from "firebase/auth";
import { onSnapshot, doc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Divider } from "react-native-elements";
import Post from "../components/home/Post";
import SettingsModel from "../components/profile/SettingsModal";

import { db, auth } from "../Firebase";
//import {AuthContext} from '../navigation/AuthProvider';

//import firestore from '@react-native-firebase/firestore';

const handleLogout = ({ navigation }) => {
  signOut(auth)
    .then(() => {
      console.log("User Logged out!");
      //navigation.push("Login");
    })
    .catch((error) => {
      console.log(error);
    });
};

const ProfileScreen = ({ navigation }) => {
  // const {user, logout} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [deleted, setDeleted] = useState(false);
  // const [userData, setUserData] = useState(null);

  const [currentLoggedInUser, setCurrentLoggedInUser] = useState([]);

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

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      // where("id", "==", auth.currentUser.uid),
      // orderBy("creatd"),
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

  // const fetchPosts = async () => {
  //   try {
  //     const list = [];

  //     await firestore()
  //       .collection('posts')
  //       .where('userId', '==', route.params ? route.params.userId : user.uid)
  //       .orderBy('postTime', 'desc')
  //       .get()
  //       .then((querySnapshot) => {
  //         // console.log('Total Posts: ', querySnapshot.size);

  //         querySnapshot.forEach((doc) => {
  //           const {
  //             userId,
  //             post,
  //             postImg,
  //             postTime,
  //             likes,
  //             comments,
  //           } = doc.data();
  //           list.push({
  //             id: doc.id,
  //             userId,
  //             userName: 'Test Name',
  //             userImg:
  //               'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
  //             postTime: postTime,
  //             post,
  //             postImg,
  //             liked: false,
  //             likes,
  //             comments,
  //           });
  //         });
  //       });

  //     setPosts(list);

  //     if (loading) {
  //       setLoading(false);
  //     }

  //     console.log('Posts: ', posts);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const getUser = async() => {
  //   await firestore()
  //   .collection('users')
  //   .doc( route.params ? route.params.userId : user.uid)
  //   .get()
  //   .then((documentSnapshot) => {
  //     if( documentSnapshot.exists ) {
  //       console.log('User Data', documentSnapshot.data());
  //       setUserData(documentSnapshot.data());
  //     }
  //   })
  // }

  // useEffect(() => {
  //   getUser();
  //   fetchPosts();
  //   navigation.addListener("focus", () => setLoading(!loading));
  // }, [navigation, loading]);

  // const handleDelete = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.userName}> {currentLoggedInUser.fullname} </Text>

        {currentLoggedInUser.profile_picture ? (
          <Image
            style={styles.userImg}
            source={{ uri: currentLoggedInUser.profile_picture }}
          />
        ) : (
          <Image
            style={[styles.userImg, { tintColor: "grey" }]}
            source={require("../assets/profileIcon.png")}
          />
        )}

        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.userLocation}>{currentLoggedInUser.city}</Text>
        <Text style={styles.aboutUser}>{currentLoggedInUser.info}</Text>

        <View style={styles.userBtnWrapper}>
          <SettingsModel navigation={navigation} />

          <TouchableOpacity style={styles.userBtn} onPress={handleLogout}>
            <Text style={styles.userBtnTxt}>Log out</Text>
          </TouchableOpacity>
        </View>

        {/* {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))} */}
      </View>

      <Divider width={5} />

      <ScrollView>
        {/* <View style={styles.postIcon}>
          <Text style={styles.postText}>Posts</Text>
        </View> */}
        {posts.map((post, index) => (
          <Post post={post} key={index} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    //tintColor: "grey",
    marginVertical: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#1267E9",
  },
  aboutUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginHorizontal: 40,
  },
  userLocation: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: -5,
  },
  userBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#1267E9",
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  userBtnIcon: {
    height: 25,
    width: 25,
    tintColor: "#1267E9",
  },
  userBtnTxt: {
    color: "#1267E9",
    fontWeight: "bold",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  postIcon: {
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: "darkgrey",
    width: 70,
    borderRadius: 12,
  },
  postText: {
    padding: 5,
    fontSize: 16,
    marginLeft: 10,
    color: "white",
  },
});
