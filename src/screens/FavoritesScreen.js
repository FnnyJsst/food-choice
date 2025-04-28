import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FavoriteCards from '../components/cards/FavoriteCards';
const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      <FavoriteCards />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});

export default FavoritesScreen; 