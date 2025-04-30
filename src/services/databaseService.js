import * as SQLite from 'expo-sqlite';

// Initialiser la base de données
export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('favorites.db');
    console.log('Base de données initialisée avec succès');
    console.log(db);
    
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
    throw error;
  }
};

// Ajouter un favori
export const addFavorite = async (product) => {
  try {
    const db = await SQLite.openDatabaseAsync('favorites.db');
//     const result = await db.runAsync(
//       'INSERT OR REPLACE INTO favorites (code, product_name, brands, nutriscore_grade, image_url) VALUES (?, ?, ?, ?, ?)',
//       [product.code, product.product_name, product.brands, product.nutriscore_grade, product.image_url]
//     );
    // console.log('Produit ajouté aux favoris:', result.lastInsertRowId);
    console.log('Database opened');
    // return result;
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    throw error;
  }
};

// Supprimer un favori
// export const removeFavorite = async (code) => {
//   try {
//     const db = await SQLite.openDatabaseAsync('favorites.db');
//     const result = await db.runAsync('DELETE FROM favorites WHERE code = ?', [code]);
//     console.log('Produit retiré des favoris:', result.changes);
//     return result;
//   } catch (error) {
//     console.error('Erreur lors de la suppression des favoris:', error);
//     throw error;
//   }
// };

// Récupérer tous les favoris
// export const getFavorites = async () => {
//   try {
//     const db = await SQLite.openDatabaseAsync('favorites.db');
//     const favorites = await db.getAllAsync('SELECT * FROM favorites ORDER BY created_at DESC');
//     console.log('Favoris récupérés:', favorites.length);
//     return favorites;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des favoris:', error);
//     throw error;
//   }
// };

// Vérifier si un produit est en favoris
// export const isFavorite = async (code) => {
//   try {
//     const db = await SQLite.openDatabaseAsync('favorites.db');
//     const result = await db.getFirstAsync('SELECT code FROM favorites WHERE code = ?', [code]);
//     return result !== null;
//   } catch (error) {
//     console.error('Erreur lors de la vérification des favoris:', error);
//     throw error;
//   }
// };

// Fonction pour initialiser la base de données de manière asynchrone
// export const initDatabase = async () => {
//   try {
//     const db = openDatabase('favorites.db');
//     console.log('Base de données initialisée avec succès');
//     return db;
//   } catch (error) {
//     console.error('Erreur lors de l\'initialisation de la base de données:', error);
//     throw error;
//   }
// };

// // Fonction temporaire pour tester la connexion
// export const testDatabase = async () => {
//   try {
//     const db = await initDatabase();
//     console.log('Test de connexion réussi');
//     return true;
//   } catch (error) {
//     console.error('Erreur lors du test de connexion:', error);
//     return false;
//   }
// };

// Vérifier la base de données
// export const checkDatabase = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='favorites';",
//         [],
//         (_, { rows: { _array } }) => {
//           console.log('Tables existantes:', _array);
//           resolve(_array);
//         },
//         (_, error) => {
//           console.error('Erreur lors de la vérification de la table:', error);
//           reject(error);
//         }
//       );
//     });
//   });
// };

// // Récupérer tous les favoris
// export const getFavorites = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM favorites ORDER BY created_at DESC;',
//         [],
//         (_, { rows: { _array } }) => {
//           console.log('Favoris récupérés:', _array.length);
//           resolve(_array);
//         },
//         (_, error) => {
//           console.error('Erreur lors de la récupération des favoris:', error);
//           reject(error);
//         }
//       );
//     });
//   });
// }; 