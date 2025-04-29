import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FavoriteCards from '../components/cards/FavoriteCards';
const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>Mes favoris</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>28 avril 2025</Text>
      </View>
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
    padding: 20,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    top: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  dateContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'flex-start',
  },
  date: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
  },
});

export default FavoritesScreen; 