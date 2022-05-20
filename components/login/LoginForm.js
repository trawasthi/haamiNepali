import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, Alert } from "react-native";
import "react-native-gesture-handler";

import { Formik } from "formik";
import * as Yup from "yup";
//import async from '@react-native-async-storage/async-storage'

import auth from "./../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Password must have at least 8 characters"),
  });

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <ScrollView style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                //following code changes the color of inputField
                // {
                //     borderColor: values.email.length < 1 || Validator.validation(values.email)
                //     ? 'gray' : 'red,'
                // },
              ]}
            >
              <TextInput
                placeholderTextColor="grey"
                fontSize="16"
                placeholder="Email address"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                //autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="gray"
                fontSize="16"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                //autoFocus={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <TouchableOpacity style={{ alignItems: "flex-end" }}>
              <Text
                style={{ color: "#1267C9", marginBottom: 25, fontSize: 16 }}
              >
                {" "}
                Forgot password ?{" "}
              </Text>
            </TouchableOpacity>

            <Pressable
              style={styles.loginButton(isValid)}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 16 }}> Log in </Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text style={{ fontSize: 16 }}> Don't have an account ? </Text>
            </View>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.push("Register")}
            >
              <Text style={{ color: "white", fontSize: 16 }}> Sign up </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },

  inputField: {
    borderRadius: 4,
    borderColor: "gray",
    padding: 12,
    backgroundColor: "white",
    marginBottom: 10,
    borderWidth: 1,
    width: 280,
  },

  loginButton: (isValid) => ({
    backgroundColor: isValid ? "#1267C9" : "#99c4e0",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),

  signupContainer: {
    //flexDirection: 'row',
    //width: '100%',
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#1267C9",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
});
