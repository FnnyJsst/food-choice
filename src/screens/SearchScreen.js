import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput 
          style={styles.input} 
          placeholder="Rechercher un produit"
          placeholderTextColor="#000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: 65,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SearchScreen; 