import { setProducts, setLoading, setError } from '../store/productStore';

const BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

export const searchProducts = async (query, dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const url = `${BASE_URL}?search_terms=${encodeURIComponent(query)}&json=1`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Réponse non-JSON reçue');
    }
    
    const data = await response.json();
    
    
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Format de réponse inattendu');
    }
    
    dispatch(setProducts(data.products));
    // dispatch(addToSearchHistory(query));
    return data.products;
  } catch (error) {
    dispatch(setError(error.message));
    return [];
  }
};


export const getProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );
    const data = await response.json();
    return data.product || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return null;
  }
};

export const getProductImageUrl = (product) => {
  if (!product) return null;
  return product.image_url || product.image_small_url || product.image_front_url;
};

export const getNutriScore = (product) => {
  if (!product) return null;
  return product.nutriscore_grade?.toUpperCase() || null;
};

export const getBrands = (product) => {
  if (!product) return null;
  return product.brands || product.brand || null;
}; 