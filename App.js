import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ScannerScreen from './src/screens/ScannerScreen';
import { Provider } from 'react-redux';
import store from './src/store';

// Import des écrans
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Recherche') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Scanner') {
                iconName = focused ? 'barcode' : 'barcode-outline';
              } else if (route.name === 'Favoris') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Profil') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#81D980',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              height: 75,
              paddingTop: 10,
              paddingBottom: 10,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Recherche" component={SearchScreen} />
          <Tab.Screen name="Scanner" component={ScannerScreen} />
          <Tab.Screen name="Favoris" component={FavoritesScreen} />
          <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
