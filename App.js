import React from "react";
import { StyleSheet, Text, View, SafeAreaViewBase } from "react-native";
import { NIVELES, generarCodigoSecreto } from "./src/utils/gameLogic";

// Seleccionamos el nivel inicial para cargar el juego
  const NIVEL_INICIAL = NIVELES.FACIL;

export default function App() {
  
  // --- GESTIÓN DEL ESTADO DEL JUEGO ---
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [nivelActual, setNivelActual] = useState(NIVEL_INICIAL);
  const [intentosRestantes, setIntentosRestantes] = useState(NIVEL_INICIAL.intentos);
  const [codigoSecreto, setCodigoSecreto] = useState([]);
  
  // Función de Inicialización del Juego
  const iniciarJuego = (nivel) => {
    const paleta = NIVELES[nivel].colores;
    
    setNivelActual(NIVELES[nivel]);
    setIntentosRestantes(NIVELES[nivel].intentos);
    setCodigoSecreto(generarCodigoSecreto(paleta));
    setJuegoActivo(true);
  };
  
  // Inicia el juego automáticamente al cargar la app
  React.useEffect(() => {
    iniciarJuego('FACIL'); // Puedes cambiar 'FACIL' por otro nivel si lo deseas
  }, []); // Se ejecuta solo una vez al montar el componente

  // --- RENDERIZADO DEL COMPONENTE PRINCIPAL ---

  return (
    <SafeAreaView style={styles.container}>
      {/* Aquí irá el componente del Selector de Nivel */}
      <Text style={styles.title}>SECRET CODE RN</Text>
      {/* DEBUG: Mostrar estado actual */}
      <View style={styles.controlsContainerContainer}>
        <Text style={styles.debugText}>Nivel: {nivelActual.nombre}</Text>
        <Text style={styles.debugText}>Intentos: {intentosRestantes}</Text>
        
      </View>
      {/* Aquí irá el componente de la Paleta de Colores y Controles */}
      
      {/* Aquí irá el componente del Tablero de Juego (Historial) */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    backgroundColor: '#f0f0f0', // Fondo claro para el cuerpo
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#333',
    marginBottom: 20,
    textShadowColor: '#33CCFF', // El azul neón como sombra
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  controlsContainer: { // <-- USAR ESTE NOMBRE
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
    color: '#33CCFF', // Texto azul neón
    fontWeight: 'bold',
    marginVertical: 4,
  }
});
