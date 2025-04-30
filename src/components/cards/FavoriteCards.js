import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { addToFavoritesAsync, removeFromFavoritesAsync } from '../../store/productStore';

const FavoriteCards = ({ title, brand, nutriscore, imageUrl, product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.products.favorites);
  const isFavorite = favorites.some(fav => fav.code === product?.code);

  const handleToggleFavorite = () => {
    if (!product) {
      return;
    }
    if (isFavorite) {
      dispatch(removeFromFavoritesAsync(product.code));
    } else {
      dispatch(addToFavoritesAsync(product));
    }
  };

  const getNutriScoreDisplay = (score) => {
    if (!score) return 'Non spécifié';
    return score.length === 1 ? score.toUpperCase() : 'Non spécifié';
  };

  const nutriscoreDisplay = getNutriScoreDisplay(nutriscore);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardImageContainer}>
            <Image 
              source={imageUrl ? { uri: imageUrl } : null} 
              style={styles.cardImage}
              onError={(e) => console.log('Erreur de chargement de l\'image:', e.nativeEvent.error)} 
            />
          </View>
          <View style={styles.cardInfoContainer}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{title || 'Produit'}</Text>
              <TouchableOpacity onPress={handleToggleFavorite}>
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={16} 
                  color={isFavorite ? "#FF6B6B" : "gray"} 
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardBrand}>{brand || 'Marque inconnue'}</Text>
            <View style={styles.cardNutriscoreContainer}>
              <View style={[styles.nutriscoreCircle, { backgroundColor: getNutriScoreColor(nutriscoreDisplay) }]} />
              <Text style={styles.cardNutriscore}>{nutriscoreDisplay}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const getNutriScoreColor = (score) => {
  switch (score) {
    case 'A':
      return '#81D980';
    case 'B':
      return '#B8E986';
    case 'C':
      return '#FED766';
    case 'D':
      return '#FF9F1C';
    case 'E':
      return '#FF6B6B';
    default:
      return '#CCCCCC';
  }
};

export default FavoriteCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
  },
  card: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  cardImageContainer: {
    marginRight: 15,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardInfoContainer: {
    flex: 1,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardNutriscoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nutriscoreCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardNutriscore: {
    fontSize: 14,
    color: '#333',
  },
});
