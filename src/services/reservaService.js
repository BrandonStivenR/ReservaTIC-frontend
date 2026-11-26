// Comunicación con el back-end Spring Boot (módulo de reservas).
const URL_BASE = "/api";

// Función auxiliar: pide datos y lanza error si el servidor falla
async function pedirJson(ruta, mensajeError) {
  const respuesta = await fetch(`${URL_BASE}${ruta}`);
  if (!respuesta.ok) throw new Error(mensajeError);
  return respuesta.json();
}

export const obtenerReservas = () => pedirJson("/reservas", "No se pudieron cargar las reservas.");
export const obtenerSalas = () => pedirJson("/salas", "No se pudieron cargar las salas.");
export const obtenerUsuarios = () => pedirJson("/usuarios", "No se pudieron cargar los usuarios.");

// Envía una nueva reserva; si el servidor rechaza, muestra su mensaje concreto
export async function crearReserva(reserva) {
  const respuesta = await fetch(`${URL_BASE}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  });
  if (!respuesta.ok) {
    let texto = "El servidor rechazó la reserva.";
    try {
      const cuerpo = await respuesta.json();
      if (cuerpo.mensaje) texto = cuerpo.mensaje;
    } catch {
      // el cuerpo no era JSON: se deja el mensaje por defecto
    }
    throw new Error(texto);
  }
  return respuesta.json();
}