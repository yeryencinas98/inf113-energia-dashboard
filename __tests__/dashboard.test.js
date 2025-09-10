/**
 * Pruebas de autocalificación para la Misión: Dashboard de Consumo Energético
 * Ponderación total: 100 (30 + 30 + 40)
 */
const fs = require('fs');
const path = require('path');

// JSDOM para pruebas de DOM
/**
 * @jest-environment jsdom
 */

const { fetchEnergyData, computeStats, renderDashboard, simulateData } = require('../src/dashboard');

// --- Utilidades ---
function mockFetchWith(data, ok = true) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: async () => data
  });
}
function mockFetchReject() {
  global.fetch = jest.fn().mockRejectedValue(new Error('network error'));
}

describe('Test 1 (30 pts): fetchEnergyData', () => {
  test('1.1 lee datos válidos desde API', async () => {
    const payload = [
      { timestamp: 1000, value: 150 },
      { timestamp: 2000, value: 250 }
    ];
    mockFetchWith(payload, true);
    const arr = await fetchEnergyData('https://api.fake/energy');
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(2);
    expect(arr[0]).toHaveProperty('timestamp');
    expect(arr[0]).toHaveProperty('value');
  });

  test('1.2 adapta json.data si viene anidado', async () => {
    const payload = { data: [{ timestamp: 3000, value: 123 }] };
    mockFetchWith(payload, true);
    const arr = await fetchEnergyData('https://api.fake/energy2');
    expect(arr.length).toBe(1);
    expect(arr[0].value).toBe(123);
  });

  test('1.3 si falla la API, simula datos', async () => {
    mockFetchReject();
    const arr = await fetchEnergyData('https://api.fake/down', 5);
    expect(arr.length).toBe(5);
    expect(arr.every(d => typeof d.value === 'number')).toBe(true);
  });

  test('1.4 modo SIMULATED', async () => {
    const arr = await fetchEnergyData('SIMULATED', 7);
    expect(arr.length).toBe(7);
  });
});

describe('Test 2 (30 pts): computeStats', () => {
  test('2.1 promedio, min y max correctos', () => {
    const data = [
      { timestamp: 1, value: 100 },
      { timestamp: 2, value: 200 },
      { timestamp: 3, value: 300 }
    ];
    const { avg, min, max } = computeStats(data);
    expect(avg).toBeCloseTo(200);
    expect(min).toBe(100);
    expect(max).toBe(300);
  });

  test('2.2 maneja arreglo vacío', () => {
    const { avg, min, max } = computeStats([]);
    expect(avg).toBe(0);
    expect(min).toBe(0);
    expect(max).toBe(0);
  });
});

describe('Test 3 (40 pts): renderDashboard + seguridad + documentación', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  test('3.1 crea elementos y muestra valores', () => {
    const data = simulateData(5);
    renderDashboard('app', data);
    const eAvg = document.getElementById('energy-avg');
    const eMin = document.getElementById('energy-min');
    const eMax = document.getElementById('energy-max');
    const eLast = document.getElementById('energy-last');
    expect(eAvg).not.toBeNull();
    expect(eMin).not.toBeNull();
    expect(eMax).not.toBeNull();
    expect(eLast).not.toBeNull();
    // Hay texto numérico en cada value
    for (const id of ['energy-avg','energy-min','energy-max','energy-last']) {
      const node = document.getElementById(id).querySelector('.value');
      expect(node).not.toBeNull();
      expect(node.textContent).toBeTruthy();
    }
  });

  test('3.2 seguridad: no usa innerHTML en el código fuente', () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'dashboard.js'), 'utf8');
    const hasInnerHTML = /\.innerHTML\s*=/.test(source);
    expect(hasInnerHTML).toBe(false);
  });

  test('3.3 documentación JSDoc presente', () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'dashboard.js'), 'utf8');
    // Debe haber comentarios tipo /** ... */ antes de las funciones clave
    const needed = ['fetchEnergyData', 'computeStats', 'renderDashboard'];
    for (const name of needed) {
      const rx = new RegExp(r, "/\\*\\*[^]*?\\*/\\s*function\\s+" + name + "\\s*\\(", 'm');
      expect(rx.test(source)).toBe(true);
    }
  });
});
