import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productStore';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore ces chemins dans l'état
        ignoredActions: ['products/addToFavorites'],
        // Ignore ces chemins dans l'état
        ignoredPaths: ['products.favorites'],
      },
    }),
});

export default store; 