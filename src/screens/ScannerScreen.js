import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { getProductByBarcode } from '../services/openFoodFactsService';
import { addToFavoritesAsync } from '../store/productStore';

const ScannerScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const dispatch = useDispatch();

  const handleBarCodeScanned = async ({ data }) => {
    if (isScanning) return;
    
    setIsScanning(true);
    try {
      const product = await getProductByBarcode(data);
      if (product) {
        Alert.alert(
          'Produit trouvé',
          `Nom: ${product.product_name}\nMarque: ${product.brands}`,
          [
            {
              text: 'Ajouter aux favoris',
              onPress: () => {
                dispatch(addToFavoritesAsync(product));
                setIsScanning(false);
              }
            },
            {
              text: 'OK',
              onPress: () => setIsScanning(false)
            }
          ]
        );
      } else {
        Alert.alert(
          'Produit non trouvé',
          'Aucun produit trouvé pour ce code-barres',
          [
            {
              text: 'OK',
              onPress: () => setIsScanning(false)
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de la recherche du produit',
        [
          {
            text: 'OK',
            onPress: () => setIsScanning(false)
          }
        ]
      );
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Veuillez autoriser l'accès à la caméra pour scanner les codes-barres.</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nous avons besoin de votre permission pour accéder à la caméra</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Autoriser l'accès à la caméra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        isFocused={true}
        onBarcodeScanned={isScanning ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc', 'upce', 'qr', 'code128'],
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.instructions}>
          Scannez le code-barres d'un produit
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#81D980',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 10,
  },
});

export default ScannerScreen; 