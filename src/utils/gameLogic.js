// 1. CONSTANTES DE CONFIGURACIÓN Y NIVELES.
export const COLORES_DISPONIBLES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
export const MAPA_COLORES = {
    '1': 'red', '2': 'blue', '3': 'green', '4': 'purple', 
    '5': 'orange', '6': 'gray', '7': 'brown', '8': 'black',
    '9': 'pink', '10': 'yellow'
};
export const NIVELES = {
    FACIL: { nombre: "Fácil", colores: 4, intentos: 20 },
    MEDIO: { nombre: "Medio", colores: 6, intentos: 20 }, 
    DIFICIL: { nombre: "Difícil", colores: 8, intentos: 20 },
    EXPERTO: { nombre: "Experto", colores: 10, intentos: 20 }
};
export const LONGITUD_CODIGO = 4;
export const MAX_INTENTOS = 20;

// 2. FUNCIONES DE LÓGICA DEL JUEGO.

export function generarCodigoSecreto(paleta) {
    const codigoSecreto = [];
    for (let i = 0; i < LONGITUD_CODIGO; i++) {
        const randomIndex = Math.floor(Math.random() * paleta.length);
        codigoSecreto.push(paleta[randomIndex]);
    }
    return codigoSecreto;
}

export function evaluarIntento(intento, secreto) {
    /** Compara el intento del jugador con el código secreto y retorna pines negros (posición y color correctos) y blancos (solo color correcto). */
    let negros = 0;
    let blancos = 0;
    
    const secretoRestante = [...secreto];
    const intentoRestante = [...intento];

    // 1. Contar Pines Negros (Posición y Color Correctos)
    for (let i = 0; i < LONGITUD_CODIGO; i++) {
        if (intento[i] === secreto[i]) {
            negros++;
            secretoRestante[i] = null; 
            intentoRestante[i] = null;
        }
    // 2. Contar Pines Blancos (Solo Color Correcto)
    for (let i = 0; i < LONGITUD_CODIGO; i++) {
        const colorIntento = intentoRestante[i];
        if (colorIntento !== null) {
            const secretIndex = secretoRestante.indexOf(colorIntento);
            if (secretIndex !== -1) {
                blancos++;
                secretoRestante[secretIndex] = null; 
            }
        }
    }
    return { negros, blancos };
    }
}