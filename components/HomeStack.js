import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CommentsScreen from "../screens/CommentsScreen";
import NewPostScreen from "../screens/NewPostScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      //screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="New post" component={NewPostScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
