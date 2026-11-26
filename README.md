# ReservaTIC – Componente front-end (GA7-220501096-AA4-EV03)

Módulo de reservas de salas y ambientes de formación, hecho con **React + Vite**.
Se conecta al back-end Spring Boot mediante `GET/POST /api/reservas`.

## Ejecutar
```bash
npm install
npm run dev        # http://localhost:5173 (el back-end debe estar en el puerto 8080)
```

## Estructura
- `src/components/`: Navbar, Alerta, CampoFormulario, TarjetaReserva, ListaReservas
- `src/pages/`: Panel y FormularioReserva
- `src/services/`: comunicación con Spring Boot
- `src/utils/`: validaciones (ficha, horas, cruce de horarios)

## Estándares de codificación
Componentes en PascalCase, variables y funciones en camelCase, indentación de 2 espacios, comentarios en español.

Aprendiz: Brandon Stiven Robles Lozada – Ficha 3336092
