import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  searchHistory: [],
  favorites: [],
  loading: false,
  error: null,
  lastSearch: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.map(product => ({
        code: product.code,
        product_name: product.product_name,
        brands: product.brands,
        nutriscore_grade: product.nutriscore_grade,
        image_url: product.image_url
      }));
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.some(fav => fav.code === action.payload.code)) {
        state.favorites.push({
          code: action.payload.code,
          product_name: action.payload.product_name,
          brands: action.payload.brands,
          nutriscore_grade: action.payload.nutriscore_grade,
          image_url: action.payload.image_url
        });
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.code !== action.payload);
    },
    setLastSearch: (state, action) => {
      state.lastSearch = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    }
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  addToFavorites,
  removeFromFavorites,
  setLastSearch,
  clearProducts
} = productSlice.actions;

export default productSlice.reducer; 