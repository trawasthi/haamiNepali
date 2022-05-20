import React, { Profiler } from "react";
import { Tab } from "react-native-elements/dist/tab/Tab";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, View } from "react-native-safe-area-context";
import LoginForm from "./components/login/LoginForm";
import PhotoUploader from "./components/newPost/PhotoUploader";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import LoginStack from "./components/LoginStack";
import NewPostScreen from "./screens/NewPostScreen";
import "react-native-gesture-handler";
import TabNavigator from "./components/TabNavigator";
import DrawerNavigatior from "./components/DrawerNavigatior";
import { NavigationContainer } from "@react-navigation/native";
import AddNewPost from "./components/newPost/AddNewPost";
import CommentScreen from "./screens/CommentsScreen";
import Post from "./components/home/Post";
import HomeStack from "./components/HomeStack";
import NewPostForm from "./components/newPost/NewPostForm";
import ProfileScreen from "./screens/ProfileScreen";
import AuthNavigation from "./AuthNavigation";
import ChooseCategory from "./components/newPost/ChooseCategory";
import ChooseCity from "./components/newPost/ChooseCity";
import ProfileScreen_others from "./screens/ProfileScreen_others";
import DeleteAccountScreen from "./screens/DeleteAccountScreen";
import AddComment from "./components/home/AddComment";
import NewComponent from "./components/NewComponent";

export default function App() {
  return <AuthNavigation />;
}
