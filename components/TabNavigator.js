import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import SavedScreen from "../screens/SavedScreen";
import DonateScreen from "../screens/DonateScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNavigator from "../components/DrawerNavigatior";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

// const CustomPlusButton = ({ children, onPress }) => (
//   <TouchableOpacity
//     style={{ justifyContent: "center", alignItems: "center" }}
//     onPress={onPress}
//   >
//     <View
//       style={{
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         //backgroundColor: '#1267C9'
//       }}
//     >
//       {children}
//     </View>
//   </TouchableOpacity>
// );

const screenOptions = {
  tabBarShowLabel: false,
};

const TabNavigator = (navigation) => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="DrawerNavigatorHome"
          component={DrawerNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../assets/homeIcon_Active.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? "red" : "grey",
                  }}
                />
                <Text style={{ color: focused ? "red" : "grey" }}>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../assets/saveIcon_Active.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? "red" : "grey",
                  }}
                />
                <Text style={{ color: focused ? "red" : "grey" }}>Saved</Text>
              </View>
            ),
          }}
        />

        {/* <Tab.Screen
          name="NewScreen"
          component={NewScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../assets/plusIcon_Active.png")}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: focused ? "red" : "grey",
                    borderColor: "#1267E9",
                    borderWidth: 4,
                    borderRadius: 15,
                  }}
                />
              </View>
            ),
            tabBarButton: (props) => <CustomPlusButton {...props} />,
          }}
        /> */}

        <Tab.Screen
          name="Donate"
          component={DonateScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../assets/donateIcon_Active.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? "red" : "grey",
                  }}
                />
                <Text style={{ color: focused ? "red" : "grey" }}>Donate</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../assets/profileIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? "red" : "grey",
                  }}
                />
                <Text style={{ color: focused ? "red" : "grey" }}>Profile</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
