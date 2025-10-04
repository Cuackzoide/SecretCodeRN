import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { NIVELES, generarCodigoSecreto, evaluarIntento, COLORES_DISPONIBLES } from './src/utils/gameLogic';
import LevelPicker from './src/components/levelPicker';
import ColorPalette, { FONDO_OSCURO, FONDO_CLARO, COLOR_NEON } from './src/components/colorPalette'; 
import GameHistory from './src/components/gameHistory';

// Seleccionamos el nivel inicial para cargar el juego
  const NIVEL_INICIAL = NIVELES.FACIL;

export default function App() {
    // --- GESTIÓN DEL ESTADO DEL JUEGO ---
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [nivelActual, setNivelActual] = useState(NIVELES[NIVEL_INICIAL]);
  const [intentosRestantes, setIntentosRestantes] = useState(NIVELES[NIVEL_INICIAL].intentos);
  const [codigoSecreto, setCodigoSecreto] = useState([]);
  const [paletaColores, setPaletaColores] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [intentoActual, setIntentoActual] = useState([]);
  
  // Función de Inicialización del Juego
  const iniciarJuego = (nivelKey) => {
  const nivelConfig = NIVELES[nivelKey];
  const paletaFiltrada = COLORES_DISPONIBLES.slice(0, nivelConfig.colores);
  const nuevoCodigo = generarCodigoSecreto(paletaFiltrada);

  setNivelActual(nivelConfig);
  setIntentosRestantes(nivelConfig.intentos);
  setPaletaColores(paletaFiltrada);
  setCodigoSecreto(nuevoCodigo);
  setJuegoActivo(true);
  setHistorial([]);
  setIntentoActual([]);
  };
  // --- FUNCIÓN DE CONSTRUCCIÓN DEL INTENTO ---
  const seleccionarColor = (colorKey) => {
    if (!juegoActivo || intentoActual.length >= codigoSecreto.length) {
      return;
    }
    setIntentoActual([...intentoActual, colorKey]);
  };
  // --- FUNCIÓN PRINCIPAL DE JUEGO (Manejador de Intento) ---
  const manejarIntento = () => {
  // 1. Validar que el intento esté completo
    if (!juegoActivo || intentoActual.length !== codigoSecreto.length) {
      Alert.alert("Alerta", `El código debe tener ${codigoSecreto.length} colores.`);
    return;
    }
  // 2. Evaluar el intento usando la función evaluarIntento
  const { negros, blancos } = evaluarIntento(intentoActual, codigoSecreto);
    
  // 3. Crear el objeto de registro del intento
  const nuevoRegistro = {
    intento: intentoActual,
    negros: negros,
    blancos: blancos,
    };
  // 4. ACTUALIZAR EL HISTORIAL (usando setHistorial)
  setHistorial([nuevoRegistro, ...historial]);
  // 5. Verificar victoria
    if (negros === codigoSecreto.length) {
      Alert.alert("¡Ganaste!", "Has descifrado el código.");
      setJuegoActivo(false);
    } else {
  // 4. Reducir intentos y verificar derrota
      const nuevosIntentos = intentosRestantes - 1;
      setIntentosRestantes(nuevosIntentos);
            
      if (nuevosIntentos <= 0) {
        Alert.alert("Perdiste", `El código era: ${codigoSecreto.join(' - ')}`);
        setJuegoActivo(false);
      }
  // 6. Resetear intento actual
    setIntentoActual([]);
    };

  // Inicia el juego automáticamente al cargar la app
  useEffect(() => {iniciarJuego(NIVEL_INICIAL);}, []);

  // --- RENDERIZADO DEL COMPONENTE PRINCIPAL ---
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SECRET CODE</Text>
      {/** 1. COMPONENTE SELECTOR DE NIVEL */}
      <View style={styles.controlsContainer}>
        <LevelPicker 
          nivelActual={nivelActual} // El estado que mantiene la dificultad actual.
          iniciarJuego={iniciarJuego} // La función que reinicia el juego.
        />
        <Text style={styles.debugText}>Nivel: {nivelActual.nombre}</Text>
        <Text style={styles.debugText}>Intentos: {intentosRestantes}</Text>
      
      {/* 2. COMPONENTE PALETA DE COLORES */}
      <ColorPalette 
        paleta={paletaColores}
        onColorSelect={seleccionarColor} // <-- USAMOS LA NUEVA FUNCIÓN
      />
      {/* 3. VISUALIZADOR DEL INTENTO ACTUAL (Simple, lo creamos aquí) */}
      <View style={styles.intentoActualContainer}>
        {codigoSecreto.map((_, index) => (
          <View
            key={index}
            style={[
              styles.intentoActualSlot,
              { backgroundColor: intentoActual[index] ? NIVELES.MAPA_COLORES[intentoActual[index]] : 'transparent' },
              intentoActual[index] && styles.peg
            ]}
          >
            {/* Indicador de posición si es vacío */}
            {!intentoActual[index] && <Text style={styles.placeholderText}>?</Text>}
          </View>
        ))}
      {/* 3. BOTÓN DE COMPROBAR */}
          <TouchableOpacity 
            style={[styles.submitButton, {opacity: intentoActual.length === codigoSecreto.length ? 1 : 0.5}]}
            onPress={manejarIntento}
            disabled={intentoActual.length !== codigoSecreto.length || !juegoActivo}
          >
          <Text style={styles.submitButtonText}>Comprobar</Text>
          </TouchableOpacity>
      </View>
      {/* 4. COMPONENTE HISTORIAL DE JUEGO */}
      <GameHistory historial={historial} /> 
    </View>
  </View>
  );
};
}

//Estilos industriales con color de acento neon
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
    color: FONDO_OSCURO,
    marginBottom: 20,
    textShadowColor: COLOR_NEON,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  controlsContainer: {
    width: '90%', 
    backgroundColor: FONDO_CLARO, 
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
    color: COLOR_NEON,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  intentoActualContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    borderWidth: 2,
    borderColor: COLOR_NEON,
    padding: 8,
    backgroundColor: FONDO_OSCURO,
    borderRadius: 5,
  },
  intentoActualSlot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 18,
  },
  peg: {
    borderWidth: 2,
    borderColor: 'white',
  },
  submitButton: {
    backgroundColor: COLOR_NEON,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: FONDO_OSCURO,
    fontWeight: 'bold',
    fontSize: 18,
  }
});
