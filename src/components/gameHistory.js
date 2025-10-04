import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MAPA_COLORES, LONGITUD_CODIGO } from '../utils/gameLogic';
import { FONDO_OSCURO, FONDO_CLARO} from './colorPalette';

// Componente Historial de Juego
const GuessRow = ({ intento, negros, blancos, isLatest }) => {
    
    // 1. Array de pines de resultado (Negros y Blancos)
    const feedbackPins = [];
    for (let i = 0; i < negros; i++) {
        feedbackPins.push('N'); // Negro
    }
    for (let i = 0; i < blancos; i++) {
        feedbackPins.push('B'); // Blanco
    }
    
    // 2. Colores del intento
    const guessPegs = intento.map(key => MAPA_COLORES[key] || 'transparent');
    const pinSlots = new Array(LONGITUD_CODIGO).fill(null);

    return (
        <View style={[styles.rowContainer, isLatest && styles.latestRow]}>
            
            {/* Pines del Intento */}
            <View style={styles.guessContainer}>
                {guessPegs.map((color, index) => (
                    <View 
                        key={index} 
                        style={[styles.peg, { backgroundColor: color }]} 
                    />
                ))}
            </View>
              {/* Pines de Retroalimentación (Negros y Blancos) */}
            <View style={styles.feedbackContainer}>
                {feedbackPins.map((type, index) => (
                    <View 
                        key={index} 
                        style={[
                            styles.feedbackPin, 
                            type === 'N' ? styles.blackPin : styles.whitePin
                        ]} 
                    />
                ))}
            </View>
        </View>
    );
};
export default function GameHistory({ historial }) {
     return (
        <FlatList
            data={historial} // Los datos a renderizar
            renderItem={({ item, index }) => (
                <GuessRow 
                    intento={item.intento} 
                    negros={item.negros} 
                    blancos={item.blancos}
                    // Determinamos si es el último (siempre al inicio de la lista)
                    isLatest={index === 0} 
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
            inverted={true} // <-- Muestra los intentos nuevos arriba (como un chat)
            ListEmptyComponent={<Text style={styles.emptyText}>¡Comienza a jugar!</Text>}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1, // Ocupa todo el espacio vertical disponible
        width: '95%',
        paddingHorizontal: 10,
        backgroundColor: FONDO_OSCURO,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        marginVertical: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: FONDO_OSCURO,
    },
    latestRow: {
        backgroundColor: FONDO_CLARO, 
        borderRadius: 4,
        paddingHorizontal: 5,
    },
    guessContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
    },
    peg: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    feedbackContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 60, // Ancho fijo para los 4 pines de retroalimentación
        justifyContent: 'flex-end',
    },
    feedbackPin: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 2,
        borderWidth: 1,
        borderColor: FONDO_CLARO,
    },
    blackPin: {
        backgroundColor: 'black',
    },
    whitePin: {
        backgroundColor: 'white',
    },
    emptyText: {
        color: 'gray',
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 18,
    }
});