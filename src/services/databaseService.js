import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('favorites.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS favorites (
          code TEXT PRIMARY KEY,
          product_name TEXT,
          brands TEXT,
          nutriscore_grade TEXT,
          image_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => {
          console.log('Base de données initialisée');
          resolve();
        },
        (_, error) => {
          console.error('Erreur lors de l\'initialisation de la base de données:', error);
          reject(error);
        }
      );
    });
  });
};

export const addFavorite = (product) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT OR REPLACE INTO favorites (code, product_name, brands, nutriscore_grade, image_url)
         VALUES (?, ?, ?, ?, ?);`,
        [
          product.code,
          product.product_name,
          product.brands,
          product.nutriscore_grade,
          product.image_url
        ],
        (_, result) => {
          console.log('Produit ajouté aux favoris');
          resolve(result);
        },
        (_, error) => {
          console.error('Erreur lors de l\'ajout aux favoris:', error);
          reject(error);
        }
      );
    });
  });
};

export const removeFavorite = (code) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM favorites WHERE code = ?;',
        [code],
        (_, result) => {
          console.log('Produit retiré des favoris');
          resolve(result);
        },
        (_, error) => {
          console.error('Erreur lors de la suppression des favoris:', error);
          reject(error);
        }
      );
    });
  });
};

export const getFavorites = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM favorites ORDER BY created_at DESC;',
        [],
        (_, { rows: { _array } }) => {
          console.log('Favoris récupérés:', _array.length);
          resolve(_array);
        },
        (_, error) => {
          console.error('Erreur lors de la récupération des favoris:', error);
          reject(error);
        }
      );
    });
  });
}; 