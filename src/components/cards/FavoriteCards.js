import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux';
import { addToFavoritesAsync } from '../../store/productStore';


const FavoriteCards = ({ title, brand, nutriscore, imageUrl, product }) => {
  const dispatch = useDispatch();
  // Convertir le nutriscore en majuscules une seule fois
  let nutriscoreUpper;
  if (nutriscore.length === 1) {
    nutriscoreUpper = nutriscore.toUpperCase();
  } else {
    nutriscoreUpper = 'Non spécifié';
  }
  // if (nutriscoreUpper === 'UNKNOW') {
  //   nutriscoreUpper = 'Non spécifié';
  // }

  const handleAddToFavorites = () => {
    console.log('Tentative d\'ajout aux favoris:', product);
    if (!product) {
      console.log('Erreur: product est undefined');
      return;
    }
    dispatch(addToFavoritesAsync(product));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardImageContainer}>
            <Image 
              source={imageUrl ? { uri: imageUrl } : require('../../../assets/burger.png')} 
              style={styles.cardImage} 
            />
          </View>
          <View style={styles.cardInfoContainer}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{title || 'Produit'}</Text>
              <TouchableOpacity onPress={handleAddToFavorites}>
                <Ionicons name="heart-outline" size={15} color="gray" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardBrand}>{brand || 'Marque inconnue'}</Text>
            <View style={styles.cardNutriscoreContainer}>
              <View style={[styles.nutriscoreCircle, { backgroundColor: getNutriScoreColor(nutriscoreUpper) }]} />
              <Text style={styles.cardNutriscore}>{nutriscoreUpper}</Text>
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
    case 'Non spécifié':
      return '#CCCCCC';
    default:
      return '#CCCCCC';
  }
};

export default FavoriteCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
