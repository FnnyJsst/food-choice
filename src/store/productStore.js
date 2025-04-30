import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite, getFavorites, initDatabase } from '../services/databaseService';

// Initialisation de la base de données
initDatabase().catch(console.error);

// Initialisation de l'état des produits
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
    await addFavorite(product);
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
      // On met à jour les produits
      state.products = action.payload;
      // On masque le loading
      state.loading = false;
      // On efface l'erreur
      state.error = null;
    },
    setLoading: (state, action) => {
      // On affiche le loading
      state.loading = action.payload;
    },
    setError: (state, action) => {
      // On affiche l'erreur
      state.error = action.payload;
      // On masque le loading
      state.loading = false;
    },
    clearProducts: (state) => {
      // On efface les produits
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Load Favorites
      .addCase(loadFavorites.pending, (state) => {
        //Tant que les favoris sont en cours de chargement, on affiche un loading
        state.loading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        //Quand les favoris sont chargés, on les affiche et on masque le loading
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        //Si les favoris ne sont pas chargés, on affiche une erreur et on masque le loading
        state.error = action.error.message;
        state.loading = false;
      })
      // Add to Favorites
      .addCase(addToFavoritesAsync.pending, (state) => {
        //Tant que le produit est en cours d'ajout aux favoris, on affiche un loading
        state.loading = true;
      })
      .addCase(addToFavoritesAsync.fulfilled, (state, action) => {
        //Si le produit n'est pas déjà dans les favoris, on l'ajoute
        if (!state.favorites.some(fav => fav.code === action.payload.code)) {
          state.favorites.push(action.payload);
        }
        //On masque le loading
        state.loading = false;
      })
      .addCase(addToFavoritesAsync.rejected, (state, action) => {
        //Si le produit n'est pas ajouté aux favoris, on affiche une erreur et on masque le loading
        state.error = action.error.message;
        state.loading = false;
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