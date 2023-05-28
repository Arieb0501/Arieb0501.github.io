
function calcularResultado() {
    const respuestasCorrectas = ["4", "1", "2"];
    const formulario = document.getElementById("quiz");
    let puntaje = 0;
  
    for (let i = 0; i < formulario.length; i++) {
      if (formulario[i].type === "radio" && formulario[i].checked) {
        if (respuestasCorrectas.includes(formulario[i].value)) {
          puntaje++;
        }
      }
    }
  
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "Tu puntaje es: " + puntaje + " de " + respuestasCorrectas.length;
  }