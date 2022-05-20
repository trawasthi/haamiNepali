import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";


const SettingsModel = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const deleteAlert = () => {
    Alert.alert(
      "Delete account permanently ?",
      "This action will delete your account permanently and cannot be undone !",
      [
        {
          text: "Cancel",
          //onPress: () => console.log("Ok"),
          style: "cancel",
        },
        {
          text: "Proceed",
          onPress: () => [
            navigation.push("Delete account"),
            setModalVisible(!modalVisible),
          ],
        },
      ]
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Category</Text> */}

            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={() => [
                navigation.push("Edit profile"),
                setModalVisible(!modalVisible),
              ]}
            >
              <Text style={styles.textStyle}>Edit pofile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={() => [
                navigation.push("Reset password"),
                setModalVisible(!modalVisible),
              ]}
            >
              <Text style={styles.textStyle}>Reset password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={deleteAlert}
            >
              <Text style={styles.deleteButtonText}>Delete account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonOpenText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsModel;

const styles = StyleSheet.create({
  centeredView: {
    //flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 15,
    //marginRight: 25,
  },
  modalView: {
    marginTop: 550,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 250,
    marginBottom: 15,
    padding: 15,
  },
  buttonOpen: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#1267E9",
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonOpenText: {
    color: "#1267E9",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#1267E9",
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: "red",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  deleteButtonText: {
    color: "red",
    fontWeight: "900",
    textAlign: "center",
  },
  cancelButtonText: {
    color: "#1267E9",
    fontWeight: "900",
    textAlign: "center",
  },
});
