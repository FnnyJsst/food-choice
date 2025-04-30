import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../services/openFoodFactsService';
import { clearProducts } from '../store/productStore';
import FavoriteCards from '../components/cards/FavoriteCards';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error, searchHistory } = useSelector(state => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Effect pour la recherche
  useEffect(() => {
    if (debouncedQuery.length > 2) {
      searchProducts(debouncedQuery, dispatch);
    } else {
      dispatch(clearProducts());
    }
  }, [debouncedQuery, dispatch]);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const renderProduct = ({ item }) => (
    <FavoriteCards
      product={item}
      title={item.product_name}
      brand={item.brands}
      nutriscore={item.nutriscore_grade}
      imageUrl={item.image_url}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher un produit"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#81D980" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.noResults}>Aucun résultat trouvé</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.code}
          contentContainerStyle={styles.listContainer}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
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
    backgroundColor: '#fff',
    marginTop: 50,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    padding: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default SearchScreen; 