// Variables globales
let exchangeRate = 1037; // Valor inicial del tipo de cambio

// Funciones relacionadas con la actualización de la selección de red social
function actualizarTipoDeRed() {
  const redSocialSeleccionada = document.getElementById("redSocial").value;
  const servicioLabel = document.getElementById("servicio-label");
  const servicioSelect = document.getElementById("servicio");

  // Limpiar opciones anteriores
  servicioSelect.innerHTML = "";

  // Definir las opciones de servicio según la red social seleccionada
  switch (redSocialSeleccionada) {
    case "instagram":
      servicioLabel.textContent = "Selecciona el tipo de servicio (Instagram):";
      servicioSelect.innerHTML = `
        <option value="seguidores">Seguidores</option>
        <option value="meGusta">Likes</option>
      `;
      break;
    case "Facebook":
      servicioLabel.textContent = "Selecciona el tipo de servicio (Facebook):";
      servicioSelect.innerHTML = `
        <option value="seguidores">Seguidores</option>
      `;
      break;
    default:
      servicioLabel.textContent = "Selecciona el tipo de servicio:";
      servicioSelect.innerHTML = "";
  }

  // Actualizar el precio después de seleccionar la red social
  actualizarPrecio();
}

// Función para agregar opciones al selector de tipo de servicio
function agregarOpciones(nombreServicio, opciones) {
  const servicioSelect = document.getElementById("tipoServicio");

  // Limpiar opciones anteriores
  servicioSelect.innerHTML = "";

  // Agregar nuevas opciones
  opciones.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.precio.toFixed(6);
    optionElement.textContent = option.nombre; // Solo mostrar el nombre del servicio
    servicioSelect.appendChild(optionElement);
  });

  // Mostrar descripción del servicio
  if (opciones.length > 0) {
    mostrarDescripcion(nombreServicio, opciones[0].descripcion);
  }
}

// Función para actualizar el precio según el tipo de servicio seleccionado
function actualizarPrecio() {
  const servicioSeleccionado = document.getElementById("servicio").value;

  // Limpiar opciones anteriores
  const servicioSelect = document.getElementById("tipoServicio");
  servicioSelect.innerHTML = "";

  // Definir los precios para cada tipo de servicio
  switch (servicioSeleccionado) {
    case "seguidores":
      switch (document.getElementById("redSocial").value) {
        case "instagram":
          agregarOpciones("Seguidores Instagram", [
            {nombre: "🔵 ID 368 - Seguidores reales de Instagram - Max 100k", precio: 0.000864 },
            {nombre: "🔴 ID 7422 - 💃 Instagram Seguidores LatinoAmerica | %100 Usuario Reales", precio: 0.00385 },
            {nombre: "🔴 ID 6279 - 🙂 Seguidores - Instagram | 100% Real Usuarios Premium | Max 1K |  Incremento Natural", precio: 0.00217 }
          ]);
          break;

        case "Facebook":
          agregarOpciones("Seguidores Facebook", [
            { nombre: "🔵 ID 2085 - Facebook - Seguidores de Perfil, Página clásica/Nueva version - Max 5k", precio: 0.00054 }
            // Agrega más opciones de seguidores de Facebook aquí
          ]);
          break;
      }
      break;
    case "meGusta":
      agregarOpciones("Likes Instagram", [
        { nombre: "🔴 6823 - ▶ Me gusta en Instagram Reels | Usuarios reales | Alta calidad | Máximo 20K | Rápido - $0.44 por 1000", precio: 0.00044},
        { nombre: "🔵 ID 277 - Instagram - Me gusta 100% Reales - Baratos - Calidad Media", precio: 0.000171},
        { nombre: "🔴 7423 ❤️ 💃 Instagram Likes LatinoAmerica | R30 | %100 Usuario Reales | 2K Por Hora", precio: 0.000171},
        { nombre: "🔴 6276 ❤️ Me Gusta - Instagram | 100% Real Usuarios Premium | MAXIMO 1K | Incremento Natural (BARATO Y PREMIUM) ", precio: 0.00012}
      ]);      break;

  }
}

function mostrarDescripcion(nombreServicio, descripcion) {
  const descripcionElement = document.getElementById("descripcionServicio");
  descripcionElement.innerHTML = `<strong>${nombreServicio}:</strong> ${descripcion}`;
}

function calcularPrecio() {
  const cantidadInput = parseFloat(document.getElementById("cantidad").value);
  const precioPorUnidad = parseFloat(
    document.getElementById("tipoServicio").value
  );
  const margenGanancia = parseFloat(document.getElementById("profit").value);

  // Verificar validez de los valores de entrada
  if (isNaN(cantidadInput) || isNaN(precioPorUnidad) || isNaN(margenGanancia)) {
    // Mostrar mensaje de error
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = "Por favor, introduce números válidos.";
    return;
  }

  // Calcular precios
  const precioSinGanancia = cantidadInput * precioPorUnidad;
  const precioConGanancia = precioSinGanancia * (1 + margenGanancia / 100);
  const precioTotalPesosSinGanancia = precioSinGanancia * exchangeRate;
  const precioTotalPesosConGanancia = redondearPrecio(
    precioConGanancia * exchangeRate
  );

  // Mostrar resultado
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = `Compras los ${cantidadInput} a ${precioTotalPesosSinGanancia.toFixed(
    2
  )} pesos y los tienes que vender a ${precioTotalPesosConGanancia.toFixed(
    2
  )} pesos.`;
}

function actualizarTipoDeCambio() {
  exchangeRate = parseFloat(document.getElementById("exchangeRate").value);
  // Después de actualizar el tipo de cambio, recalculamos el precio
  calcularPrecio();
}

function convertToPesos() {
  const usdAmount = parseFloat(document.getElementById("usdAmount").value);
  const pesoAmount = usdAmount * exchangeRate;
  document.getElementById("pesoResultado").innerText = `${usdAmount.toFixed(
    2
  )} dólares son ${pesoAmount.toFixed(2)} pesos.`;
}

function convertToDollars() {
  const pesoAmount = parseFloat(document.getElementById("pesoAmount").value);
  const dollarAmount = pesoAmount / exchangeRate;
  document.getElementById("dollarResultado").innerText = `${pesoAmount.toFixed(
    2
  )} pesos equivalen aproximadamente a ${dollarAmount.toFixed(2)} dólares.`;
}

function redondearPrecio(precio) {
  return Math.round(precio / 10) * 10;
}

window.onload = function () {
  actualizarTipoDeRed(); // Llamar a esta función al cargar la página para inicializar el tipo de servicio
};
