# ReservaTIC – Front-end (GA8-220501096-AA1-EV01)

Interfaz web en **React + Vite** que consume la API de `ReservaTIC-backend` (Spring Boot, puerto 8081).

## Ejecutar
```bash
npm install
npm run dev      # http://localhost:5173  (el back-end debe estar encendido en el puerto 8081)
npm test         # pruebas unitarias (Vitest)
```
Usuario de prueba creado por el back-end: `admin` / `Admin123`.

## Pantallas (mapa de navegación)
`/login` → `/` (Panel de reservas) ⇄ `/nueva` (Nueva reserva) · `/registro` · cerrar sesión → `/login`.
El panel y el formulario requieren sesión iniciada.

## Estructura
`pages/` pantallas · `components/` piezas reutilizables · `services/api.js` conexión con el back-end ·
`context/` sesión · `utils/` validaciones y sus pruebas.

Aprendiz: Brandon Stiven Robles Lozada – Ficha 3336092
