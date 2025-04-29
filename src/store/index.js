import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productStore';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store; 