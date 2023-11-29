import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';

// Definición del componente HomeScreen
const HomeScreen = ({ navigation }) => {
  // Estados para manejar la fecha, resultados de búsqueda, errores y estado de búsqueda
  const [fechaProporcionadaPorElUsuario, setFechaProporcionadaPorElUsuario] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  // Clave de la API de la NASA
  const apiKey = "6jtsDJCDHa46NBEEIR6abbdA66CzaO84bEWhKs54";

  // Función asincrónica para realizar la búsqueda en el espacio
  const searchSpaceData = async () => {
    try {
      // Verifica si no se ha ingresado una fecha
      if (!fechaProporcionadaPorElUsuario) {
        setError("Por favor, ingresa una fecha en el formato YYYY-MM-DD.");
        setHasSearched(false);
        return;
      }

      // Expresión regular para verificar el formato de fecha
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

      // Verifica si la fecha tiene el formato correcto
      if (!dateFormatRegex.test(fechaProporcionadaPorElUsuario)) {
        setError("Formato de fecha incorrecto. Por favor, utiliza el formato YYYY-MM-DD.");
        setHasSearched(false);
        return;
      }

      // Reinicia los errores y establece que se ha realizado una búsqueda
      setError(null);
      setHasSearched(true);

      // Obtiene la fecha actual y la fecha proporcionada por el usuario
      const currentDate = new Date();
      const userDate = new Date(fechaProporcionadaPorElUsuario);

      // Verifica que la fecha esté en un rango específico
      if (userDate < new Date("1995-06-16") || userDate > currentDate) {
        setError("La fecha debe estar entre el 16 de Junio de 1995 y la fecha actual.");
        setHasSearched(false);
        return;
      }

      // Realiza una solicitud a la API de la NASA utilizando la clave y la fecha proporcionada por el usuario
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fechaProporcionadaPorElUsuario}`);
      // Convierte la respuesta a formato JSON
      const data = await response.json();

      // Muestra los resultados de la búsqueda en la consola
      console.log("Resultados de la búsqueda:", data);

      // Actualiza el estado con los resultados de la búsqueda
      setSearchResult(data);
    } catch (error) {
      // Manejo de errores en caso de que la búsqueda falle
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  // Función para reiniciar la búsqueda
  const refreshSearch = () => {
    setFechaProporcionadaPorElUsuario("");
    setSearchResult(null);
    setError(null);
    setHasSearched(false);
  };

  // Renderiza la interfaz del componente
  return (
    <ScrollView style={styles.container}>
      {/* Título del componente */}
      <Text style={styles.title}>Ingresa una fecha</Text>
      {/* Contenedor de entrada de búsqueda */}
      <View style={styles.searchContainer}>
        {/* Entrada de texto para la fecha */}
        <TextInput
          style={styles.searchInput}
          placeholder="Formato (YYYY-MM-DD)..."
          value={fechaProporcionadaPorElUsuario}
          onChangeText={setFechaProporcionadaPorElUsuario}
        />
        {/* Botón para iniciar la búsqueda */}
        <Button title="Buscar" onPress={searchSpaceData} />
      </View>

      {/* Sección para el botón de refrescar */}
      {hasSearched && (
        <View style={styles.buttonContainer}>
          <Button title="Refrescar" onPress={refreshSearch} />
        </View>
      )}

      {/* Muestra el error si hay alguno */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Muestra un mensaje si no se ha realizado ninguna búsqueda */}
      {!hasSearched ? (
        <Text style={styles.noResultsText}>Aún no se ha realizado ninguna búsqueda</Text>
      ) : searchResult ? (  // Muestra los resultados de la búsqueda si existen
        <View style={styles.resultItem}>
          {/* Muestra la imagen del espacio */}
          <Image
            style={styles.spaceImage}
            source={{ uri: searchResult.url }}
          />
          {/* Muestra el título y la explicación de la imagen */}
          <Text style={styles.spaceTitle}>{searchResult.title}</Text>
          <Text>{searchResult.explanation}</Text>
        </View>
      ) : (  // Muestra un mensaje si no se encontraron resultados
        <Text style={styles.noResultsText}>No se encontraron resultados</Text>
      )}
    </ScrollView>
  );
};

// Estilos del componente
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  buttonContainer: {
    marginRight: 8,
  },
  spaceImage: {
    width: 200,
    height: 150,
    margin: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
  spaceTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
  resultItem: {
    marginBottom: 16,
  },
  noResultsText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 8,
  },
});

// Exporta el componente HomeScreen
export default HomeScreen;
