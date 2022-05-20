import { View, Text, Image } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import Screen_1 from "./drawerScreens/Screen_1";
import Screen_2 from "./drawerScreens/Screen_2";
import HomeStack from "./HomeStack";

const Drawer = createDrawerNavigator();

const MenuButton = () => {
  return (
    <Image
      style={{ height: 40, width: 30 }}
      source={require("../assets/menuBar.png")}
    />
  );
};

const DrawerNavigatior = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        options={{
          headerShown: false
        }}
        name="Home"
        component={HomeStack}
      />
      <Drawer.Screen name="Screen_1" component={Screen_1} />
      <Drawer.Screen name="Screen_2" component={Screen_2} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatior;
