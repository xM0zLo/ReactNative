import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const ApodScreen = () => {
    // Estado para almacenar los datos de la Imagen Astronómica del Día (APOD)
    const [apodData, setApodData] = useState(null);
    
    // Clave de API para acceder a la API de la NASA
    const apiKey = "6jtsDJCDHa46NBEEIR6abbdA66CzaO84bEWhKs54"; 

    // Efecto secundario que se ejecuta después de que el componente se monta
    useEffect(() => {
        // Función asincrónica para obtener datos de la API de la NASA
        const fetchApodData = async () => {
            try {
                // Realiza una solicitud a la API de la NASA para obtener la Imagen Astronómica del Día (APOD)
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
                // Convierte la respuesta a formato JSON
                const data = await response.json();
                // Actualiza el estado con los datos obtenidos
                setApodData(data);
            } catch (error) {
                // Manejo de errores en caso de que la solicitud falle
                console.error("Error al obtener la Imagen Astronómica del Día (APOD):", error);
            }
        };

        // Llama a la función para obtener los datos al cargar el componente
        fetchApodData();
    }, [apiKey]); // El efecto se ejecuta cuando la clave de API cambia

    // Renderizado del componente
    return (
        <ScrollView style={styles.container}>
            {/* Título del componente */}
            <Text style={styles.title}>Imagen Astronómica del Día (APOD)</Text>

            {/* Comprobación de existencia de datos antes de renderizar la imagen y la explicación */}
            {apodData && (
                <View>
                    {/* Imagen de la APOD */}
                    <Image
                        style={styles.apodImage}
                        source={{ uri: apodData.url }}
                    />
                    {/* Explicación de la imagen */}
                    <Text style={styles.apodExplanation}>{apodData.explanation}</Text>
                </View>
            )}
        </ScrollView>
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
    apodImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginVertical: 16,
    },
    apodExplanation: {
        color: 'white',
        fontSize: 16,
        textAlign: 'justify',
    },
});

// Exporta el componente ApodScreen
export default ApodScreen;
