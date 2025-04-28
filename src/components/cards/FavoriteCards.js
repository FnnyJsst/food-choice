import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoriteCards = () => {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Produit Favori</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default FavoriteCards;
