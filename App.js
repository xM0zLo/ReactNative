// Importa React desde la biblioteca 'react'
import React from 'react';

// Importa 'NavigationContainer' desde 'react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';

// Importa el componente 'AppNavigation' desde el archivo correspondiente en './Navigations/'
import AppNavigation from './Navigations/AppNavigation';

// Define el componente funcional 'App'
const App = () => {
  // Retorna un contenedor de navegación que envuelve el componente 'AppNavigation'
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

// Exporta el componente 'App' para su uso en otras partes de la aplicación
export default App;

