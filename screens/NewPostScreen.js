import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AddNewPost from "../components/newPost/AddNewPost";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { db, auth } from "../Firebase";
import { onSnapshot, doc } from "firebase/firestore";

const NewPostScreen = ({ navigation }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState([]);
  const user = auth.currentUser;

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
  return (
    <View>
      {/* <NewPostHeader navigation={navigation} /> */}
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            {!currentLoggedInUser.profile_picture ? 
            <Image
              source={require("../assets/profileIcon.png")}
              style={[styles.profileThumbnail, {tintColor: 'grey'}]}
            /> : <Image
            source={{uri: currentLoggedInUser.profile_picture}}
            style={styles.profileThumbnail}
          />}
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={{
                marginLeft: 10,
                marginBottom: 5,
                fontWeight: "bold",
                fontSize: 16,
                color: "#1267E9",
              }}
            >
              {currentLoggedInUser.fullname}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <AddNewPost navigation={navigation} />
    </View>
  );
};

// const NewPostHeader = ({ navigation }) => {
//   return (
//     <View style={styles.headerContainer}>
//       <View style={{ marginBottom: 5 }}>
//         <TouchableOpacity
//           style={{ flexDirection: "row", alignItems: "center" }}
//           onPress={() => {
//             navigation.push("HomeScreen");
//           }}
//         >
//           <Ionicons name="chevron-back" size={28} color="#1267E9" />

//           <Text style={styles.backText}>Home</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.headerText}>New post</Text>
//       <Text> </Text>
//     </View>
//   );
// };

export default NewPostScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "white",
    height: 90,
  },
  backText: {
    fontSize: 18,
    color: "#1267E9",
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 10,
  },
  profileThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 10,
    //tintColor: "grey",
  },
});
