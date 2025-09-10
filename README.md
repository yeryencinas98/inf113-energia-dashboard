# INF-113 · Programación Web I
## Misión: Dashboard de Consumo Energético (Autograding)

**Cliente:** empresa internacional solicita un *dashboard web* con estadísticas de consumo energético en tiempo (casi) real.

**Objetivo del estudiante:** implementar funciones en `src/dashboard.js`. **No debes crear tests**. El repositorio trae 3 pruebas automáticas que califican **/100**.

### ⚙️ Requisitos
- Node.js 18+
- GitHub Classroom (el docente te dará el enlace)
- No necesitas frameworks (puedes usar JS plano)

### 🚀 Instrucciones
1. Acepta la tarea en el enlace de **GitHub Classroom**.
2. Clona tu repo y entra a la carpeta.
3. Instala dependencias: `npm install`
4. Implementa **solo** en `src/dashboard.js`:
   - `fetchEnergyData(apiUrl, fallbackCount=10)` → retorna arreglo de objetos `{ timestamp, value }` desde una API o datos simulados.
   - `computeStats(data)` → retorna `{ avg, min, max }` (números).
   - `renderDashboard(containerId, data)` → actualiza el DOM con estadísticas y último valor **usando `textContent` (no `innerHTML`)**.
5. Ejecuta localmente (opcional): `npm test`
6. Commit + push. Revisa **Actions → Autograding** para ver tu puntaje.

### 🧪 Ponderación de pruebas
- **Test 1 (30 pts):** `fetchEnergyData` (con y sin API, maneja caídas con datos simulados).
- **Test 2 (30 pts):** `computeStats` (promedio, mínimo, máximo correctos).
- **Test 3 (40 pts):** `renderDashboard` (pinta en el DOM; segura —*no usa* `innerHTML`; y **documentación JSDoc** presente en el archivo).

### 📦 Estructura
```
.
├── src/
│   └── dashboard.js
├── __tests__/
│   └── dashboard.test.js
├── package.json
├── jest.config.js
└── .github/
    ├── workflows/autograding.yml
    └── classroom/autograding.json
```

### 📝 Consejo
Simula datos cuando no tengas API real: genera `fallbackCount` lecturas con `timestamp = Date.now()` y valores entre 100–500.

---
**Docente:** UMSA · Carrera de Informática · INF-113
