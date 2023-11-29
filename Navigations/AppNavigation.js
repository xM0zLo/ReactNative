// Importa React desde la biblioteca 'react'
import React from 'react';

// Importa el componente 'createBottomTabNavigator' desde 'react-navigation/bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importa los componentes de las pantallas desde los archivos correspondientes
import HomeScreen from '../Screens/HomeScreen';
import SpaceSpectationsScreen from '../Screens/SpaceSpectationsScreen';
import MarsPhotoScreen from '../Screens/MarsPhotoScreen';
import ApodScreen from '../Screens/ApodScreen';

// Importa los iconos de Material Community desde 'expo-vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Crea un navegador de pestañas inferior con 'createBottomTabNavigator'
const Tab = createBottomTabNavigator();

// Define el componente funcional 'HomeStack'
const HomeStack = () => (
  // Retorna el navegador de pestañas con sus configuraciones y pantallas correspondientes
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarInactiveTintColor: 'gray',          // Color de la pestaña inactiva
      tabBarStyle: { backgroundColor: 'white' }, // Estilo de la barra de pestañas
      tabBarActiveTintColor: '#007AFF',          // Color de la pestaña activa
    }}
  >
    {/* Pantalla 'Home' */}
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Inicio',                            // Etiqueta de la pestaña
        tabBarIcon: ({ color }) => (                      // Icono de la pestaña
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    {/* Pantalla 'Apod' */}
    <Tab.Screen
      name="Apod"
      component={ApodScreen}
      options={{
        tabBarLabel: 'APOD',                              // Etiqueta de la pestaña
        tabBarIcon: ({ color }) => (                      // Icono de la pestaña
          <MaterialCommunityIcons name="star" color={color} size={26} />
        ),
      }}
    />
    {/* Pantalla 'Estaciones Espaciales' */}
    <Tab.Screen
      name="Estaciones Espaciales"
      component={SpaceSpectationsScreen}
      options={{
        tabBarLabel: 'NASA',                              // Etiqueta de la pestaña
        tabBarIcon: ({ color }) => (                      // Icono de la pestaña
          <MaterialCommunityIcons name="satellite-variant" color={color} size={26} />
        ),
      }}
    />
    {/* Pantalla 'Imagenes de Marte' */}
    <Tab.Screen
      name="Imagenes de Marte"
      component={MarsPhotoScreen}
      options={{
        tabBarLabel: 'Imagenes',                          // Etiqueta de la pestaña
        tabBarIcon: ({ color }) => (                      // Icono de la pestaña
          <MaterialCommunityIcons name="image" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Exporta el componente 'HomeStack' para su uso en otras partes de la aplicación
export default HomeStack;


