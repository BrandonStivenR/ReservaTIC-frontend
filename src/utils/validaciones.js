// Reglas de validación del front-end (las mismas que aplica el back-end Spring Boot)

// Usuario: 3 a 30 caracteres entre letras, números, punto, guion y guion bajo
export const usuarioValido = (u) => /^[A-Za-z0-9._-]{3,30}$/.test(u);

// Ficha: 3 a 20 caracteres entre letras, números o guion
export const fichaValida = (f) => /^[A-Za-z0-9-]{3,20}$/.test(f);

// El servidor puede devolver "08:00:00"; se compara solo "HH:MM"
export const hhmm = (hora) => String(hora ?? "").slice(0, 5);

// La hora de fin debe ser posterior a la de inicio
export const horasCoherentes = (inicio, fin) => hhmm(inicio) < hhmm(fin);

// Hay cruce si: mismo ambiente y fecha, reserva no cancelada y horarios traslapados.
// Una reserva que termina a las 10:00 NO se cruza con otra que empieza a las 10:00.
export function hayCruce(nueva, reservas) {
  return reservas.some(
    (r) =>
      r.estado !== "CANCELADA" &&
      Number(r.ambienteId) === Number(nueva.ambienteId) &&
      r.fecha === nueva.fecha &&
      hhmm(nueva.horaInicio) < hhmm(r.horaFin) &&
      hhmm(nueva.horaFin) > hhmm(r.horaInicio)
  );
}

// Cada validador devuelve un objeto { campo: "mensaje" } (vacío si todo está bien)
export function validarLogin({ usuario, contrasena }) {
  const errores = {};
  if (!usuario.trim()) errores.usuario = "Escribe tu usuario.";
  if (!contrasena) errores.contrasena = "Escribe tu contraseña.";
  return errores;
}

export function validarRegistro({ nombre, usuario, contrasena }) {
  const errores = {};
  const largo = nombre.trim().length;
  if (largo < 3 || largo > 100) errores.nombre = "El nombre debe tener de 3 a 100 caracteres.";
  if (!usuarioValido(usuario.trim()))
    errores.usuario = "De 3 a 30 caracteres: letras, números, punto, guion o guion bajo.";
  if (contrasena.length < 6) errores.contrasena = "La contraseña debe tener al menos 6 caracteres.";
  return errores;
}

export function validarReserva(datos, existentes, hoy = new Date().toLocaleDateString("en-CA")) {
  const errores = {};
  if (!datos.ambienteId) errores.ambienteId = "Selecciona un ambiente.";
  if (!fichaValida(datos.ficha.trim()))
    errores.ficha = "De 3 a 20 caracteres: letras, números o guion.";
  if (!datos.fecha) errores.fecha = "Selecciona la fecha.";
  else if (datos.fecha < hoy) errores.fecha = "La fecha no puede estar en el pasado.";
  if (!datos.horaInicio) errores.horaInicio = "Selecciona la hora de inicio.";
  if (!datos.horaFin) errores.horaFin = "Selecciona la hora de fin.";
  if (datos.horaInicio && datos.horaFin) {
    if (!horasCoherentes(datos.horaInicio, datos.horaFin))
      errores.horaFin = "La hora de fin debe ser posterior a la de inicio.";
    else if (!errores.ambienteId && !errores.fecha && hayCruce(datos, existentes))
      errores.horaInicio = "Ese ambiente ya está reservado en ese horario.";
  }
  return errores;
}
