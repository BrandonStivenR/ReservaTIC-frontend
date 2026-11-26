// Reglas de validación del formulario de reservas (según el documento EV02)

// La ficha solo admite letras y números (sin caracteres especiales)
export const fichaValida = (ficha) => /^[A-Za-z0-9]+$/.test(ficha);

// La hora de fin debe ser posterior a la de inicio ("HH:MM" se compara como texto)
export const horasCoherentes = (inicio, fin) => inicio < fin;

// Hay cruce si es la misma sala, el mismo día y los rangos de hora se solapan
export function hayCruce(nueva, reservas) {
  return reservas.some(
    (r) =>
      r.sala === nueva.sala &&
      r.fecha === nueva.fecha &&
      nueva.horaInicio < r.horaFin &&
      nueva.horaFin > r.horaInicio
  );
}

// Valida todo el formulario y devuelve un objeto { campo: "mensaje" }
export function validarReserva(datos, reservasExistentes) {
  const errores = {};
  if (!datos.sala.trim()) errores.sala = "Escribe el nombre de la sala.";
  if (!datos.usuario.trim()) errores.usuario = "Escribe el nombre del usuario.";
  if (!datos.ficha.trim()) errores.ficha = "Escribe el número de ficha.";
  else if (!fichaValida(datos.ficha))
    errores.ficha = "La ficha solo puede tener letras y números.";
  if (!datos.fecha) errores.fecha = "Selecciona la fecha.";
  if (!datos.horaInicio) errores.horaInicio = "Selecciona la hora de inicio.";
  if (!datos.horaFin) errores.horaFin = "Selecciona la hora de fin.";
  if (datos.horaInicio && datos.horaFin) {
    if (!horasCoherentes(datos.horaInicio, datos.horaFin))
      errores.horaFin = "La hora de fin debe ser posterior a la de inicio.";
    else if (!errores.sala && !errores.fecha && hayCruce(datos, reservasExistentes))
      errores.horaInicio = "Esa sala ya está reservada en ese horario.";
  }
  return errores;
}
