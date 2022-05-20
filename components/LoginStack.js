import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

// const screenOptions = {
//     headerShown: false
// }

function LoginStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        //screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Reset password" component={ResetPasswordScreen} />
        {/* <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Edit profile" component={EditProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LoginStack;
