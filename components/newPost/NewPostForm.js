import { View, StyleSheet } from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { TextInput } from "react-native";
import PhotoUploader from "./PhotoUploader";

import ChooseCity from "./ChooseCity";
import ChooseCategory from "./ChooseCategory";
import { Button } from "react-native-elements/dist/buttons/Button";

const UploadPostSchema = Yup.object().shape({
  //imageUrl: Yup.string().url().required('Image required'),
  caption: [
    Yup.string().min(2, "Caption must be at least 2 characters long"),
    Yup.string().max(2200, " Character limit reached"),
  ],
});

const NewPostForm = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ caption: "", photo: "", category: "", city: "" }}
      onSubmit={(values) => {
        //uploadPostToFirebase(values.caption, values.photo)
        console.log(values);
        console.log("Your post was submitted succefully");
        navigation.goBack();
      }}
      validateonSchema={UploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View>
            <TextInput
              style={styles.postBox}
              placeholder="Share something..."
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={handleChange("caption")}
              onBlur={handleBlur("caption")}
              value={values.caption}
            />

            <View style={styles.optionsBar}>
              <PhotoUploader />
              <View>
                <ChooseCategory />
                <ChooseCity />
              </View>
            </View>

            <Button
              style={styles.postButton(isValid)}
              onPress={handleSubmit}
              title="Post"
            ></Button>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  postBox: {
    height: 200,
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
    backgroundColor: "white",
    // borderWidth: 0.25,
    // borderColor: 'gray',
    borderRadius: 8,
    padding: 5,
  },

  imageContainer: {
    flexDirection: "row",
  },

  postButton: (isValid) => ({
    backgroundColor: isValid ? "#1267E9" : "#99c4e0",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 60,
  }),

  optionsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },

  blankSpace: {
    height: 5,
    width: "100%",
    backgroundColor: "lightgrey",
  },
});
export default NewPostForm;
