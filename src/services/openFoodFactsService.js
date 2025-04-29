const BASE_URL = 'https://world.openfoodfacts.org/api/v2';

export const searchProducts = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?search_terms=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Erreur lors de la recherche de produits:', error);
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