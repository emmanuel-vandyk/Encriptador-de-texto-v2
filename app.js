// Variables para mostrar/ocultar elementos.
let contenedor = document.querySelector('.overlap-group');
let contenedor2 = document.querySelector('.overlap-group-2');

// Contenedor de respuesta inicia oculto.
contenedor2.style.display = "none";


// Variables para obtener y enviar el texto ingresado en el textarea.
let textArea = document.querySelector('.text-area');
let respuesta = document.querySelector('.texto-encriptado');

// Función para validar el texto.
function validarTexto() {
    entradaTexto = document.querySelector('#inputText').value;
    let validador = entradaTexto.match(/^[a-z\s]+$/i);

    if (validador || validador === 0) {
        alert("Solo se permiten letras minúsculas y sin acentos");
        location.reload();
        return true;
    }
}

// Variable para crear el evento de click en el botón. 
let btnEncriptar = document.querySelector(".btn-encriptador");

// Evento de botón que dispara la función para encriptar texto.
btnEncriptar.addEventListener('click', () => {
    if (!validarTexto()) {
    let textoCifrado = encriptar(textArea.value);
    respuesta.innerHTML = textoCifrado;

    // Limpia la casilla de texto inicial al recibir la respuesta.
    textArea.value = '';

    // Ocultar contenedor inicial.
    contenedor.style.display = "none";

    // Visualizar contenedor de respuesta.
    contenedor2.style.display = "block";
    }
});

// Lógica para encriptar texto.
function encriptar(texto) {
    // Array que reemplaza las vocales.
    let reemplazoTexto = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    texto = texto.toLowerCase(); // Regla: texto en minúscula.

    // El bucle for itera sobre la posición 0 de cada array anidado y los reemplaza por la posición 1.
    for (let i = 0; i < reemplazoTexto.length; i++) {
        if (texto.includes(reemplazoTexto[i][0])) {
            texto = texto.replaceAll(reemplazoTexto[i][0], reemplazoTexto[i][1]);
        }
    }
    return texto;
}

// Lógica para desencriptar texto.
function desencriptar(textoDescifrado) {
    // Array para volver al estado inicial del texto. 
    let textoInicial = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    textoDescifrado = textoDescifrado.toLowerCase(); // Regla: texto en minúscula.

    // El bucle for itera sobre la posición 1 de cada array anidado y los reemplaza por la posición 0.
    for (let i = 0; i < textoInicial.length; i++) {
        if (textoDescifrado.includes(textoInicial[i][1])) {
            textoDescifrado = textoDescifrado.replaceAll(textoInicial[i][1], textoInicial[i][0]);
        }
    }
    return textoDescifrado;
}

// Variable botón desencriptar.
let btnDesencriptar = document.querySelector('.btn-desencriptar');

// Evento click sobre el botón desencriptar.
btnDesencriptar.addEventListener('click', async () => {
    // Obtener el texto copiado del portapapeles.
    let textoCopiado = await leerPortapapeles();

    if (textoCopiado !== null) {
        // Mostrar el resultado en pantalla.
        document.querySelector(".text-area").value = desencriptar(textoCopiado);
    }
});

// Función para copiar texto.
function copiar() {
    if (navigator.clipboard) {
        // Obtiene el contenido de la respuesta cifrada.
        navigator.clipboard.writeText(respuesta.textContent)
        .then(() => {
            respuesta.innerHTML = "¡Texto copiado al portapapeles!";
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error);
        });
    } else {
        console.warn("API del portapapeles no compatible");
    }
}

// Variable y evento de click para el botón de copiar.
let btnCopiar = document.querySelector('.button-copiar');

btnCopiar.addEventListener('click', copiar);

async function leerPortapapeles() {
    try {
        const textoCopiado = await navigator.clipboard.readText();
        return textoCopiado; 
    } catch (error) {
        console.error("Falló al leer el texto desde el portapapeles: ", error);
        return null;
    }
}