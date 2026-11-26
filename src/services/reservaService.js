// Comunicación con el back-end Spring Boot (módulo de reservas).
// Endpoints esperados: GET /api/reservas y POST /api/reservas
const URL_BASE = "/api/reservas";

// Obtiene todas las reservas registradas
export async function obtenerReservas() {
  const respuesta = await fetch(URL_BASE);
  if (!respuesta.ok) throw new Error("No se pudieron cargar las reservas.");
  return respuesta.json();
}

// Envía una nueva reserva al servidor
export async function crearReserva(reserva) {
  const respuesta = await fetch(URL_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  });
  if (!respuesta.ok) throw new Error("El servidor rechazó la reserva.");
  return respuesta.json();
}
