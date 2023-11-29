// Importa React y los hooks necesarios desde 'react'
import React, { useState, useEffect } from 'react';

// Importa componentes y estilos específicos de React Native
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Importa la constante 'statusBarHeight' de 'expo-constants'
import Constants from 'expo-constants';

// Define el componente funcional 'MarsPhotosScreen'
const MarsPhotosScreen = () => {
  // Estado para almacenar datos de fotos de Marte
  const [marsPhotosData, setMarsPhotosData] = useState([]);

  // Clave de API para la solicitud a la API de la NASA
  const apiKey = "6jtsDJCDHa46NBEEIR6abbdA66CzaO84bEWhKs54";

  // Efecto secundario que se ejecuta después de que el componente se monta
  useEffect(() => {
    // Función asincrónica para obtener datos de fotos de Marte
    const fetchMarsPhotosData = async () => {
      try {
        // Realiza una solicitud a la API de fotos de Marte de la NASA
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`);
        
        // Convierte la respuesta a formato JSON
        const data = await response.json();
        
        // Actualiza el estado con los datos de las fotos de Marte
        setMarsPhotosData(data.photos);
      } catch (error) {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error al obtener datos de fotos de Marte:", error);
      }
    };

    // Llama a la función para obtener los datos al cargar el componente
    fetchMarsPhotosData();
  }, [apiKey]); // El efecto se ejecuta cuando la clave de API cambia

  // Función para renderizar cada elemento de la lista de fotos de Marte
  const renderPhotoItem = ({ item }) => (
    <View style={styles.photoItem}>
      {/* Nombre de la cámara */}
      <Text style={styles.photoTitle}>{item.camera.full_name}</Text>
      {/* Imagen de la cámara */}
      <Image
        style={styles.photoImage}
        source={{ uri: item.img_src }} // Usa la imagen principal de la cámara
      />
      {/* Detalles de la foto */}
      <Text style={styles.photoDetail}>{`Sol: ${item.sol}`}</Text>
      <Text style={styles.photoDetail}>{`Fecha: ${item.earth_date}`}</Text>
    </View>
  );

  // Renderizado del componente
  return (
    <View style={styles.container}>
      {/* Título del componente */}
      <Text style={styles.title}>Fotos de Marte de la NASA</Text>
      {/* Lista plana de fotos de Marte */}
      <FlatList
        data={marsPhotosData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPhotoItem}
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
  photoItem: {
    backgroundColor: '#616161',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  photoImage: {
    width: '100%', // Ocupa el ancho completo del contenedor
    height: 200,    // Altura fija de 200 unidades
    borderRadius: 8,
    marginVertical: 8,
  },
  photoTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  photoDetail: {
    color: 'white',
    fontSize: 16,
  },
});

// Exporta el componente MarsPhotosScreen
export default MarsPhotosScreen;


