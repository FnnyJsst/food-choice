import * as SQLite from 'expo-sqlite';

// Initialiser la base de données
export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('favorites.db');
    
    // Créer la table des favoris
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS favorites (
        code TEXT PRIMARY KEY NOT NULL,
        product_name TEXT NOT NULL,
        brands TEXT,
        nutriscore_grade TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    return db;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  }
};

// Ajouter un favori
export const addFavorite = async (product) => {
  try {
    if (!product || !product.code) {
      console.error('Produit invalide: code manquant');
    }

    const db = await SQLite.openDatabaseAsync('favorites.db');
    
    const result = await db.runAsync(
      'INSERT OR REPLACE INTO favorites (code, product_name, brands, nutriscore_grade, image_url) VALUES (?, ?, ?, ?, ?)',
      [product.code, product.product_name, product.brands, product.nutriscore_grade, product.image_url]
    );

    return result;
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
  }
};

// Récupérer tous les favoris
export const getFavorites = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('favorites.db');
    const favorites = await db.getAllAsync('SELECT * FROM favorites ORDER BY created_at DESC');
    return favorites;
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
  }
};

// Vérifier la base de données
export const checkDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('favorites.db');
    const result = await db.getFirstAsync('SELECT name FROM sqlite_master WHERE type = "table" AND name = "favorites"');
    return result !== null;
  } catch (error) { 
    console.error('Erreur lors de la vérification de la base de données:', error);
  }
};