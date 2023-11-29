import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';

const SpaceSpectationsScreen = () => {
  // Estado para almacenar datos de estaciones espaciales
  const [spaceStationsData, setSpaceStationsData] = useState([]);
  // Clave de API para acceder a la API de estaciones espaciales
  const apiKey = "6jtsDJCDHa46NBEEIR6abbdA66CzaO84bEWhKs54";

  // Efecto secundario que se ejecuta después de que el componente se monta 
  useEffect(() => {
    // Función asincrónica para obtener datos de estaciones espaciales
    const fetchSpaceStationsData = async () => {
      try {
        // Realiza una solicitud a la API de estaciones espaciales
        const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/?filter%5B%5D=isPlanet&format=json`);
        // Convierte la respuesta a formato JSON
        const data = await response.json();
        // Filtra las estaciones espaciales de los datos obtenidos
        const spaceStations = data.bodies.filter(body => body.isPlanet === false);
        // Actualiza el estado con los datos filtrados
        setSpaceStationsData(spaceStations);
      } catch (error) {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error al obtener datos de estaciones espaciales:", error);
      }
    };

    // Llama a la función para obtener los datos al cargar el componente
    fetchSpaceStationsData();
  }, [apiKey]); // El efecto se ejecuta cuando la clave de API cambia

  // Función para renderizar cada elemento de estación espacial en la lista
  const renderSpaceStationItem = ({ item }) => (
    <View style={styles.spaceStationItem}>
      {/* Nombre de la estación espacial */}
      <Text style={styles.spaceStationTitle}>{item.englishName}</Text>
      {/* Detalles adicionales de la estación espacial */}
      <Text style={styles.spaceStationDetail}>{`Masa: ${item.mass?.massValue || 'Desconocida'} ${item.mass?.massExponent || 'Desconocido'} kg`}</Text>
      <Text style={styles.spaceStationDetail}>{`Diámetro: ${item.meanRadius || 'Desconocido'} km`}</Text>
      {/* Puedes agregar más detalles según las propiedades de tus datos */}
    </View>
  );

  // Renderizado del componente
  return (
    <View style={styles.container}>
      {/* Título del componente */}
      <Text style={styles.title}>Estaciones Espaciales</Text>
      {/* Lista plana de estaciones espaciales */}
      <FlatList
        data={spaceStationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderSpaceStationItem}
      />
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#4c4949',
    padding: 16,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  spaceStationItem: {
    backgroundColor: '#616161',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  spaceStationTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spaceStationDetail: {
    color: 'white',
    fontSize: 16,
  },
});

// Exporta el componente SpaceSpectationsScreen
export default SpaceSpectationsScreen;
