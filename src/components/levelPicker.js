import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // <--- Selector de React Native
import { NIVELES } from '../utils/gameLogic';
import { COLOR_NEON, FONDO_CLARO, FONDO_OSCURO } from './colorPalette'

// src/components/LevelPicker.js (continuación)

export default function LevelPicker({ nivelActual, iniciarJuego }) {
    
    // Convertimos el objeto NIVELES en un array de opciones para el Picker
    const nivelesArray = Object.entries(NIVELES);

    // La función que se llama cuando el usuario cambia el selector
    const manejarCambioNivel = (itemValue) => {
        // itemValue será la clave del nivel (ej: 'FACIL', 'MEDIO')
        iniciarJuego(itemValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nivel:</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={Object.keys(NIVELES).find(key => NIVELES[key] === nivelActual)}
                    onValueChange={manejarCambioNivel}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    {/* Mapeamos el array de niveles a las opciones */}
                    {nivelesArray.map(([key, nivel]) => (
                        <Picker.Item 
                            key={key} 
                            label={nivel.nombre} 
                            value={key} 
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Para que el texto y el selector estén en fila
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    label: {
        color: 'white', // El contenedor principal es oscuro, usamos texto claro
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    pickerWrapper: {
        backgroundColor: FONDO_OSCURO,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#000',
        overflow: 'hidden',
    },
    picker: {
        width: 200,
        height: 40,
        color: COLOR_NEON, 
    },
    pickerItem: {
        backgroundColor: FONDO_CLARO,
        color: 'white',
        fontSize: 16,
    }
});