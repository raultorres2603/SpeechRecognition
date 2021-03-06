// VARIABLE DE RECONOCIMIENTO DE VOZ //
/**
*@author Raul Torres
*@typedef {object} SpeechRecognition
*/
let rec;

// OBJETOS DEL DOCUMENTO //
/**
*@typedef {object}
*/
var texto = document.getElementById('texto');
var boton = document.getElementById('botonEmpezar');

// ESTADO DEL RECONOCIMIENTO DE VOZ //
/**
*@type {number}
*/
var estadoRV = 0;

// CONTADOR PARA METER EN VARIABLES //
/**
*@typedef {number}
*/
var contador = 0;

// VARIABLES PARA UTILIZACIÓN //
/**
*@typedef {object}
*/
var n1 = 0;
/**
*@typedef {object}
*/
var n2 = 0;
/**
*@typedef {object}
*/
var n3 = 0;

    if (!("webkitSpeechRecognition" in window)) { // Si no se puede utilizar la API webkitSpeechRecognition que muestre alerta else if crea el objeto //
    	alert("No puedes usar ésta API en éste navegador");
    } else {
    	rec = new webkitSpeechRecognition(); // Iniciación del objeto //
    	rec.lang = "es-ES"; // Lenguaje del objeto //
    	rec.continuous = true; // Continuidad (no se para) //
    	rec.interim = true;
    	rec.addEventListener("result",iniciar); // Añadir evento //
    }
    /**
    *@description Inicia el proceso de reconocimiento de voz. Posteriormente lo guardará en variables.
    */
function iniciar(event){
	for (let i = event.resultIndex; i < event.results.length; i++){
    /**
    *@typedef {object}
    */
      var escuchado = event.results[i][0].transcript; // Variable que coje el valor del reconociemiento una vez pasados unos 2 segundos //
      texto.value = escuchado; // Asignar al input la variable escuchado //

         if (contador == 0) { // If dependiendo de la variable contador //
           n1 = escuchado;
           contador++;
         } else if (contador == 1) {
            n2 = escuchado;
            contador++;
         } else if (contador == 2) {
            n3 = escuchado;
            decir("Registrado");
            alert(n1 + " " + n2 + " " + n3);
            reiniciar();
         }
	}
}

function reiniciar() {
  contador = 0;
  n1 = 0;
  n2 = 0;
  n3 = 0;
}

=======
/**
*@description Llama al método start() para iniciar el reconocimiento
*/

function startRec() { // Función que inicia o para el reconocimiento de voz //
  if (estadoRV == 0) {
    rec.start();
    texto.placeholder = "Te escucho...";
    boton.innerHTML = "Escuchando...";
    estadoRV = 1;
  } else if (estadoRV == 1) {
    rec.stop();
    texto.value = "";
    texto.placeholder = "Lo que digas aparecerá aquí";
    boton.innerHTML = "Escuchar";
    reiniciar();
    estadoRV = 0;
  }
}

function decir(texto){
    var voz = texto;
    speechSynthesis.speak(new SpeechSynthesisUtterance(voz));
}
