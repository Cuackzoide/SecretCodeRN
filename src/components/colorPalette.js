import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MAPA_COLORES } from '../utils/gameLogic';

//Color de acento neon para estilo
const COLOR_NEON = '#33CCFF';
const FONDO_OSCURO = '#333';
const FONDO_CLARO = '#666';

// Componente Paleta de Colores

export default function ColorPalette({ paleta, onColorSelect }) {
    const coloresActivos = paleta.map(key => ({
        key: key,
        color: MAPA_COLORES[key]
    }));
    return (
         <View style={styles.paletteContainer}>
            {coloresActivos.map((colorObj) => (
                <TouchableOpacity
                    key={colorObj.key}
                    style={[styles.colorButton, 
                    { backgroundColor: colorObj.color }]}
                    onPress={() => onColorSelect(colorObj.key)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    paletteContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: FONDO_OSCURO, 
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOR_NEON,
        marginVertical: 20,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 6,
        borderWidth: 2,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5
    },
});