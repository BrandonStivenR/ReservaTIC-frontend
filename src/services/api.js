// Comunicación con el back-end ReservaTIC (Spring Boot). Todas las rutas empiezan por /api.
const URL_BASE = "/api";

// Función auxiliar: envía la petición y devuelve el JSON; si falla, lanza el mensaje del servidor
async function peticion(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${URL_BASE}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Verifica que el back-end esté encendido.");
  }
  if (respuesta.status === 204) return null; // sin contenido (DELETE)
  let cuerpo = null;
  try {
    cuerpo = await respuesta.json();
  } catch {
    // la respuesta no traía JSON
  }
  if (!respuesta.ok) throw new Error(cuerpo?.mensaje || "No se pudo completar la operación.");
  return cuerpo;
}

const enviar = (metodo, datos) => ({ method: metodo, body: JSON.stringify(datos) });

// ---- Autenticación ----
export const iniciarSesion = (usuario, contrasena) => peticion("/auth/login", enviar("POST", { usuario, contrasena }));
export const registrarUsuario = (datos) => peticion("/auth/registro", enviar("POST", datos));

// ---- Ambientes ----
export const obtenerAmbientes = () => peticion("/ambientes?estado=DISPONIBLE");

// ---- Reservas ----
export const obtenerReservas = (estado = "") => peticion(estado ? `/reservas?estado=${estado}` : "/reservas");
export const crearReserva = (reserva) => peticion("/reservas", enviar("POST", reserva));
export const confirmarReserva = (id) => peticion(`/reservas/${id}/confirmar`, { method: "PATCH" });
export const cancelarReserva = (id) => peticion(`/reservas/${id}/cancelar`, { method: "PATCH" });
export const eliminarReserva = (id) => peticion(`/reservas/${id}`, { method: "DELETE" });
