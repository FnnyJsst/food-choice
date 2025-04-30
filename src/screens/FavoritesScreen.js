import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavorites, removeFromFavoritesAsync } from '../store/productStore';
import { checkDatabase } from '../services/databaseService';
import FavoriteCards from '../components/cards/FavoriteCards';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    // Vérifier la base de données
    checkDatabase()
      .then(() => {
        // Charger les favoris
        dispatch(loadFavorites());
      })
      .catch(error => {
        console.error('Erreur lors de la vérification de la base de données:', error);
      });
  }, [dispatch]);

  const handleRemoveFavorite = (code) => {
    Alert.alert(
      'Retirer des favoris',
      'Voulez-vous vraiment retirer ce produit des favoris ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Retirer',
          onPress: () => dispatch(removeFromFavoritesAsync(code)),
          style: 'destructive'
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chargement des favoris...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Aucun favori pour le moment</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleRemoveFavorite(item.code)}>
            <FavoriteCards
              title={item.product_name}
              brand={item.brands}
              nutriscore={item.nutriscore_grade}
              imageUrl={item.image_url}
              product={item}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  listContainer: {
    padding: 15,
  },
});

export default FavoritesScreen; 