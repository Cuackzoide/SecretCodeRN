import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NIVELES, generarCodigoSecreto } from './src/utils/gameLogic';
import LevelPicker from './src/components/levelPicker';
import ColorPalette, { FONDO_OSCURO, FONDO_CLARO, COLOR_NEON } from './src/components/colorPalette';

// Seleccionamos el nivel inicial para cargar el juego
  const NIVEL_INICIAL = NIVELES.FACIL;

export default function App() {
  // --- GESTIÓN DEL ESTADO DEL JUEGO ---
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [nivelActual, setNivelActual] = useState(NIVEL_INICIAL);
  const [intentosRestantes, setIntentosRestantes] = useState(NIVEL_INICIAL.intentos);
  const [codigoSecreto, setCodigoSecreto] = useState([]);
  const [paletaColores, setPaletaColores] = useState([]);
  
  // Función de Inicialización del Juego
  const iniciarJuego = (nivelKey) => {
  const nivelConfig = NIVELES[nivelKey];
  const paletaFiltrada = COLORES_DISPONIBLES_BASE.slice(0, nivelConfig.colores); 

  // Actualizamos todos los estados relevantes  
    setNivelActual(nivelConfig);
    setIntentosRestantes(nivelConfig.intentos);
    setPaletaColores(paletaFiltrada);
    setCodigoSecreto(generarCodigoSecreto(paletaFiltrada));
    setJuegoActivo(true);
  };
  
  // Inicia el juego automáticamente al cargar la app
  React.useEffect(() => {
    iniciarJuego('FACIL');}, []);

  // --- RENDERIZADO DEL COMPONENTE PRINCIPAL ---
  return (
    <View style={styles.container}>
      {/* 1. COMPONENTE SELECTOR DE NIVEL */}
        <LevelPicker 
          nivelActual={nivelActual} // El estado que mantiene la dificultad actual.
          iniciarJuego={iniciarJuego} // La función que reinicia el juego.
        />
      {/* 2. DEBUG: Mostrar el estado de juego bajo el selector */}
        <Text style={styles.debugText}>Nivel Seleccionado: {nivelActual.nombre}</Text>
        <Text style={styles.debugText}>Intentos Restantes: {intentosRestantes}</Text>
        
        <Text style={styles.title}>SECRET CODE RN</Text>
      {/* DEBUG: Mostrar estado actual */}
      <View style={styles.controlsContainer}>
        <Text style={styles.debugText}>Nivel: {nivelActual.nombre}</Text>
        <Text style={styles.debugText}>Intentos: {intentosRestantes}</Text>
        
      </View>
      {/* 3. COMPONENTE PALETA DE COLORES */}
      <ColorPalette 
        paleta={paletaColores} // Le pasamos la paleta filtrada del estado
        onColorSelect={(colorKey) => console.log('Color seleccionado:', colorKey)}
      />
      {/* Aquí irá el componente del Tablero de Juego (Historial) */}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#333',
    marginBottom: 20,
    textShadowColor: '#33CCFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  controlsContainer: {
      width: '90%', 
      backgroundColor: '#3a3a3a', 
      padding: 15,
      borderRadius: 8,
      borderWidth: 3,
      borderColor: '#000', 
      marginBottom: 20,
      alignItems: 'center', 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      elevation: 10,
  },
  debugText: {
    fontSize: 16,
    color: '#33CCFF',
    fontWeight: 'bold',
    marginVertical: 4,
  }
});
