import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const SearchBar = () => {
    const [text, onChangeText] = React.useState(null);
  return (
    <View style= {styles.searchContainer}>
      <TouchableOpacity>
      <TextInput
      style={styles.SearchBar}
      onChangeText={onChangeText}
      placeholder = 'Search...'
      />
      </TouchableOpacity>
      <TouchableOpacity>
      <Image 
      style = {styles.searchIcon}
      source = {require('../../assets/searchIcon.png')}>
      </Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;


const styles = StyleSheet.create ({
    searchContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 5,
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 15,
    },
    SearchBar: {
        fontWeight: 'bold',
        left: 10,
    },
    searchIcon: {
        height: 20,
        width: 20,
        margin: 4
    }

})