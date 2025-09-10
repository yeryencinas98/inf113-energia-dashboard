/**
 * Obtiene lecturas de consumo energético desde una API.
 * Si la API falla o apiUrl es 'SIMULATED', genera datos simulados.
 * @param {string} apiUrl - URL de la API o 'SIMULATED'
 * @param {number} [fallbackCount=10] - Cantidad de muestras simuladas si no hay API
 * @returns {Promise<Array<{timestamp:number,value:number}>>}
 */
async function fetchEnergyData(apiUrl, fallbackCount = 10) {
  // Realizar la logica correspondiente, la funcion debe retornar el dato mencionado
}

/**
 * Calcula promedio, mínimo y máximo del consumo.
 * @param {Array<{timestamp:number,value:number}>} data
 * @returns {{avg:number,min:number,max:number}}
 */
function computeStats(data) {
  // Realizar la logica correspondiente, la funcion debe retornar el dato mencionado
}

/**
 * Renderiza el dashboard en el contenedor indicado.
 * Debe usar textContent (no innerHTML) para prevenir XSS.
 * Debe crear, si no existen, elementos con ids: energy-avg, energy-min, energy-max, energy-last.
 * @param {string} containerId - id del contenedor
 * @param {Array<{timestamp:number,value:number}>} data - lecturas a mostrar
 */
function renderDashboard(containerId, data) {
   // Realizar la logica correspondiente, la funcion debe retornar el dato mencionado
}



module.exports = { fetchEnergyData, computeStats, renderDashboard, simulateData };
