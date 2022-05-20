import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ChooseCity = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [city, setCity] = useState(null);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Category</Text> */}

            {city != "All Australia" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("All Australia"), props.cityOptions("All Australia")]}
              >
                <Text style={styles.textStyle}>All Australia</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>All Australia</Text>
              </TouchableOpacity>
            )}

            {city != "New South Wales" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("New South Wales"), props.cityOptions("New South Wales")]}
              >
                <Text style={styles.textStyle}>New South Wales</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>New South Wales</Text>
              </TouchableOpacity>
            )}

            {city != "Victoria" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("Victoria"), props.cityOptions("Victoria")]}
              >
                <Text style={styles.textStyle}>Victoria</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>Victoria</Text>
              </TouchableOpacity>
            )}

            {city != "Queensland" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("Queensland"), props.cityOptions("Queensland")]}
              >
                <Text style={styles.textStyle}>Queensland</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>Queensland</Text>
              </TouchableOpacity>
            )}

            {city != "Canberra (ACT)" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("Canberra (ACT)"), props.cityOptions("Canberra (ACT)")]}
              >
                <Text style={styles.textStyle}>Canberra (ACT)</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>Canberra (ACT)</Text>
              </TouchableOpacity>
            )}

            {city != "South Australia" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("South Australia"), props.cityOptions("South Australia")]}
              >
                <Text style={styles.textStyle}>South Australia</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>South Australia</Text>
              </TouchableOpacity>
            )}

            {city != "Tamania" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("Tasmania"), props.cityOptions("Tasmania")]}
              >
                <Text style={styles.textStyle}>Tamania</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>Tamania</Text>
              </TouchableOpacity>
            )}

            {city != "Western Australia" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("Western Australia"), props.cityOptions("Western Australia")]}
              >
                <Text style={styles.textStyle}>Western Australia</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>Western Australia</Text>
              </TouchableOpacity>
            )}

            {city != "Northern Territory" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCity("Northern Territory"), props.cityOptions("Northern Territory")]}
              >
                <Text style={styles.textStyle}>Northern Territory</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCity(null)]}
              >
                <Text style={styles.textStyle}>Northern Territory</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {city == null ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginBottom: 5, color: "#545050" }}>
            Please select a Region:
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              styles.modalButton,
              { flexDirection: "row", justifyContent: "space-around" },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Region</Text>
            <AntDesign name="downcircleo" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginBottom: 5, color: "#545050" }}>
            Selected region:
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButtonSelected]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>{city}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default ChooseCity;

const styles = StyleSheet.create({
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    marginTop: 250,
    marginLeft: 180,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 150,
    marginBottom: 5,
  },
  buttonOpen: {
    backgroundColor: "darkgrey",
  },
  modalButton: {
    backgroundColor: "darkgrey",
  },
  modalButtonSelected: {
    backgroundColor: "#1267E9",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  doneButtonText: {
    color: "#1267E9",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: -15,
  },
});
