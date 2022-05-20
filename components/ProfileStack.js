import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ResetPassScreen from "../screens/ResetPassScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import VerifyAccountScreen from "../screens/VerifyAccountScreen";

const Stack = createNativeStackNavigator();

// const screenOptions = {
//     headerShown: false
// }

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      //screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit profile" component={EditProfileScreen} />
      <Stack.Screen name="Reset password" component={ResetPassScreen} />
      <Stack.Screen name="Delete account" component={DeleteAccountScreen} />
      <Stack.Screen name="Verify account" component={VerifyAccountScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
