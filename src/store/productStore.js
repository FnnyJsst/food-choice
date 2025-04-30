import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite, getFavorites, initDatabase } from '../services/databaseService';

// Initialisation de la base de données
initDatabase().catch(console.error);

const initialState = {
  products: [],
  searchHistory: [],
  favorites: [],
  loading: false,
  error: null,
  lastSearch: '',
};

// Thunks pour les opérations asynchrones
export const loadFavorites = createAsyncThunk(
  'products/loadFavorites',
  async () => {
    const favorites = await getFavorites();
    return favorites;
  }
);

export const addToFavoritesAsync = createAsyncThunk(
  'products/addToFavorites',
  async (product) => {
    console.log('addFavouriteAsync called avec:', product);
    await addFavorite(product);
    console.log('Product added to favorites');
    return product;
  }
);

export const removeFromFavoritesAsync = createAsyncThunk(
  'products/removeFromFavorites',
  async (code) => {
    await removeFavorite(code);
    return code;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
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
    setLastSearch: (state, action) => {
      state.lastSearch = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Load Favorites
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Add to Favorites
      .addCase(addToFavoritesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavoritesAsync.fulfilled, (state, action) => {
        console.log('Ajout aux favoris réussi:', action.payload);
        if (!state.favorites.some(fav => fav.code === action.payload.code)) {
          state.favorites.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addToFavoritesAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Remove from Favorites
      .addCase(removeFromFavoritesAsync.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(fav => fav.code !== action.payload);
      });
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setLastSearch,
  clearProducts
} = productSlice.actions;

export default productSlice.reducer; 