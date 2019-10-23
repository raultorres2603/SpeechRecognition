// VARIABLE DE RECONOCIMIENTO DE VOZ //
let rec;

// OBJETOS DEL DOCUMENTO //
var texto = document.getElementById('texto');
var boton = document.getElementById('botonEmpezar');

// ESTADO DEL RECONOCIMIENTO DE VOZ //
var estadoRV = 0;

// CONTADOR PARA METER EN VARIABLES //
var contador = 0;

// VARIABLES PARA UTILIZACIÓN //
var n1 = 0;
var n2 = 0;
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
function iniciar(event){
	for (let i = event.resultIndex; i < event.results.length; i++){
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
            alert(n1 + " " + n2 + " " + n3);
            contador = 0;
            n1 = 0;
            n2 = 0;
            n3 = 0;
         }
	}
}

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
    estadoRV = 0;
  }
}
