// Reglas de validación del formulario (iguales a las del back-end Spring Boot)

// Ficha: letras, números, espacios, punto y guion
export const fichaValida = (ficha) => /^[A-Za-z0-9ÁÉÍÓÚÜáéíóúüÑñ .-]+$/.test(ficha);

// La hora de fin debe ser posterior a la de inicio ("HH:MM" se compara como texto)
export const horasCoherentes = (inicio, fin) => inicio < fin;

// Hay cruce si es la misma sala y fecha, la reserva no está cancelada y los horarios se solapan
export function hayCruce(nueva, reservas) {
  return reservas.some(
    (r) =>
      r.estado !== "Cancelada" &&
      Number(r.idSala) === Number(nueva.idSala) &&
      r.fecha === nueva.fecha &&
      nueva.horaInicio < r.horaFin &&
      nueva.horaFin > r.horaInicio
  );
}

// Valida todo el formulario y devuelve un objeto { campo: "mensaje" }
export function validarReserva(datos, reservasExistentes) {
  const errores = {};
  const hoy = new Date().toLocaleDateString("en-CA"); // formato AAAA-MM-DD
  if (!datos.idSala) errores.idSala = "Selecciona una sala.";
  if (!datos.idUsuario) errores.idUsuario = "Selecciona un usuario.";
  if (!datos.ficha.trim()) errores.ficha = "Escribe la ficha o programa.";
  else if (datos.ficha.trim().length > 50) errores.ficha = "La ficha no puede superar los 50 caracteres.";
  else if (!fichaValida(datos.ficha.trim()))
    errores.ficha = "La ficha solo admite letras, números, espacios, punto y guion.";
  if (!datos.fecha) errores.fecha = "Selecciona la fecha.";
  else if (datos.fecha < hoy) errores.fecha = "No se puede reservar en una fecha pasada.";
  if (!datos.horaInicio) errores.horaInicio = "Selecciona la hora de inicio.";
  if (!datos.horaFin) errores.horaFin = "Selecciona la hora de fin.";
  if (datos.horaInicio && datos.horaFin) {
    if (!horasCoherentes(datos.horaInicio, datos.horaFin))
      errores.horaFin = "La hora de fin debe ser posterior a la de inicio.";
    else if (!errores.idSala && !errores.fecha && datos.estado !== "Cancelada"
             && hayCruce(datos, reservasExistentes))
      errores.horaInicio = "Esa sala ya está reservada en ese horario.";
  }
  return errores;
}