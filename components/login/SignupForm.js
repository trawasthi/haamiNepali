import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, {useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import { Formik } from 'formik'
import * as Yup from 'yup'
//import { Validator } from 'email-validator'



const SignupForm = ({navigation}) => {
    const signupFormSchema = Yup.object().shape ({
        fullname: Yup.string().required().min(4, 'Please enter your full name'),
        username: Yup.string().required().min(2, 'A username is required'),
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Password must have at least 8 characters')
    })
  return (
    <View style={styles.wrapper}>
      
      <Formik
        initialValues={{ fullname: '', username: '', email: '', password: ''}}
        onSubmit={values => {
            console.log(values)
        }}
        validationSchema={signupFormSchema}
        validateOnMount = {true}
      >
          
          {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
        
        <>
        
        <View style={styles.inputField}>
            <TextInput 
            placeholderTextColor = 'gray'
            fontSize = '16'
            placeholder='Full name'
            autoCapitalize= {true}
            autoCorrect = {false}
            secureTextEntry = {false}
            textContentType='fullname'
            autoFocus={true}
            onChangeText={handleChange('fullname')}
            onBlur={handleBlur('fullname')}
            value={values.fullname}
            />
        </View>

        <View style={styles.inputField}>
            <TextInput 
            placeholderTextColor = 'gray'
            fontSize = '16'
            placeholder='username'
            autoCapitalize= 'none'
            //autoCorrect = {false}
            secureTextEntry = {false}
            textContentType='username'
            //autoFocus={false}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            />
        </View>

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
            placeholderTextColor = 'grey'
            fontSize = '16'
            placeholder='Email address'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            //autoFocus={true}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            />
        </View>

        <View style={styles.inputField}>
            <TextInput 
            placeholderTextColor = 'gray'
            fontSize = '16'
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect = {false}
            secureTextEntry = {true}
            textContentType='password'
            //autoFocus={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            />
        </View>

        <View style={{marginTop: 20}}/>

        <Pressable 
            style={styles.loginButton(isValid)}
            onPress={handleSubmit}
        >
            <Text style={{color: 'white', fontSize: 16}}> Sign up </Text>
        </Pressable>
        

        <View style={styles.signupContainer}>
            <Text style={{fontSize: 16}}> Already have an account ? </Text>
        </View>
          
        <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => navigation.goBack()}
        >
            <Text style={{color: 'white', fontSize: 16}}> Log in </Text>
        </TouchableOpacity>
        </>
        )}
        </Formik>
    </View>
  )
}

export default SignupForm


const styles = StyleSheet.create ({
    wrapper: {
        //marginTop: 20,
    },

    inputField: {
        borderRadius: 4,
        borderColor: 'gray',
        padding: 12,
        backgroundColor: 'white',
        marginBottom: 10,
        borderWidth: 1,
        width: 280,
    },

    loginButton: isValid =>({
        backgroundColor: isValid ? '#1267C9' : '#99c4e0',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),

    signupContainer: {
        //flexDirection: 'row',
        //width: '100%',
        alignItems: 'center', 
        marginTop: 50,
        marginBottom: 10
    },
    signupButton: {
        backgroundColor: '#1267C9',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }
})