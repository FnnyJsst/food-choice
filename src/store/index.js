import { configureStore } from '@reduxjs/toolkit';
// Import du reducer qui gère l'état des produits
import productReducer from './productStore';

// Création du store
export const store = configureStore({
  // Création du reducer, qui gère l'état des produits
  reducer: {
    products: productReducer,
  }
});

export default store; 