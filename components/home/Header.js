import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Header = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{ height: 40, width: 30, tintColor: "#545050" }}
            source={require("../../assets/menuBar.png")}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>Haami Nepali</Text>

      {/* <Image
          source={require("../../assets/logoRectangle.png")}
          style={styles.logo}
        /> */}

      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>??</Text>
            </View>
          </TouchableOpacity>
          {/* <Ionicons name="notifications" size={28} color="#545050" /> */}
          <Image
            style={styles.icons}
            source={require("../../assets/notificationIcon.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>??</Text>
            </View>
          </TouchableOpacity>
          <Image
            style={styles.icons}
            source={require("../../assets/messageIcon.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //marginHorizontal: 10,
    //backgroundColor: "red",
    //height: 90,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  iconContainer: {
    width: 90,
    //marginLeft: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 10,
  },

  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },

  icons: {
    width: 30,
    height: 25,
    resizeMode: "contain",
  },
  unreadBadge: {
    backgroundColor: "red",
    position: "absolute",
    left: 10,
    bottom: -10,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
  },
});
