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
import { auth } from "./../Firebase";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Password reset email sent! Please check your email for details"
        );
        navigation.push("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode);
      });
  };

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
          <Text style={{ fontSize: 16, marginTop: 20 }}>
            {" "}
            Receive an email link{" "}
          </Text>
        </View>

        <View>
          <TextInput
            placeholder="Your email address"
            autoCapitalize="none"
            //autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.buttonContainer}>
          {!email ? (
            <View style={[styles.button, styles.buttonDisabled]}>
              <Text style={styles.buttonText}>Reset password</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={resetPassword} style={styles.button}>
              <Text style={styles.buttonText}>Reset password</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

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
    marginTop: 10,
    marginBottom: 5,
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
  buttonDisabled: {
    backgroundColor: 'grey'
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
