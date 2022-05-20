import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const VerifyAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.push("Home");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert("You have been verified !", "You can now safely delete your account");
        navigation.goBack()
      })
      .catch(
        (error) =>
          Alert.alert(
            "Invalid login details"
          )
        //
      );
  };

  // const provider = () => {
  //   GoogleAuthProvider();
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require("./../assets/logoSquare.png")}
            style={{ height: 65, width: 65, margin: 30 }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            //autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.push("Reset password")}
          style={{ alignItems: "flex-end" }}
        >
          <Text style={{ color: "#1267E9", fontSize: 16 }}>
            {" "}
            Forgot password ?{" "}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
        {/* LOGIN WIHT FACEBOOK AND LOGIN WITH GOOGLE BUTTONS */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            //onPress={() => navigation.push("Register")}
            style={[styles.button, styles.buttonFacebook]}
          >
            <FontAwesome name="facebook" size={24} color="#1267E9" />
            <Text style={styles.buttonFacebookText}>Login with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>{}}
            style={[styles.button, styles.buttonGoogle]}
          >
            <AntDesign name="google" size={24} color="red" />
            <Text style={styles.buttonGoogleText}>Login with Google</Text>
          </TouchableOpacity>
        </View> */}

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyAccountScreen;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "lightgrey",
    marginVertical: 5,
    width: 300,
  },
  buttonContainer: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1267E9",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonLogo: {},
  buttonFacebook: {
    backgroundColor: "white",
    marginTop: 10,
    borderColor: "#1267E9",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonGoogle: {
    backgroundColor: "white",
    marginTop: 10,
    borderColor: "red",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonFacebookText: {
    color: "#1267E9",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonGoogleText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});
