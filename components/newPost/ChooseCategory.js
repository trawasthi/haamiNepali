import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";


const ChooseCategory = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   if(category) {
  //     console.log("useEffect:" + category)
  //     setCategory(category)
  //   }
  // }, [category])

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

            {category != "Post share" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCategory("Post share"), props.options("Post share")]}
              >
                <Text style={styles.textStyle}>Post share</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCategory(null)]}
              >
                <Text style={styles.textStyle}>Post share</Text>
              </TouchableOpacity>
            )}

            {category != "Job" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCategory("Job"), props.options("Job")]}
              >
                <Text style={styles.textStyle}>Job</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCategory(null)]}
              >
                <Text style={styles.textStyle}>Job</Text>
              </TouchableOpacity>
            )}

            {category != "Rent" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCategory("Rent"), props.options("Rent")]}
              >
                <Text style={styles.textStyle}>Rent</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCategory(null)]}
              >
                <Text style={styles.textStyle}>Rent</Text>
              </TouchableOpacity>
            )}

            {category != "Buy/sell" ? (
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => [setCategory("Buy/sell"), props.options("Buy/sell")]}
              >
                <Text style={styles.textStyle}>Buy/sell</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.modalButtonSelected]}
                onPress={() => [setCategory(null)]}
              >
                <Text style={styles.textStyle}>Buy/sell</Text>
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

      {category == null ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginBottom: 5, color: "#545050" }}>
            Please select a category:
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              styles.modalButton,
              { flexDirection: "row", justifyContent: "space-around" },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Category</Text>
            <AntDesign name="downcircleo" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginBottom: 5, color: "#545050" }}>
            Selected category:
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButtonSelected]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>{category}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChooseCategory;


const styles = StyleSheet.create({
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 25,
  },
  modalView: {
    marginTop: 340,
    marginLeft: 180,
    backgroundColor: "white",
    borderRadius: 20,
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
