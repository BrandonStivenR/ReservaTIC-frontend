// Muestra una reserva y sus acciones (confirmar, cancelar y eliminar)
import { hhmm } from "../utils/validaciones.js";

export default function TarjetaReserva({ reserva, onConfirmar, onCancelar, onEliminar }) {
  const { id, ambienteNombre, responsableNombre, ficha, fecha, horaInicio, horaFin, estado } = reserva;
  return (
    <article className="tarjeta">
      <header>
        <h3>{ambienteNombre}</h3>
        <span className={`estado estado--${estado.toLowerCase()}`}>{estado}</span>
      </header>
      <p>Reserva #{id} · {responsableNombre} · Ficha {ficha}</p>
      <p>{fecha}, de {hhmm(horaInicio)} a {hhmm(horaFin)}</p>
      <div className="tarjeta__acciones">
        {estado === "PENDIENTE" && <button className="boton boton--chico" onClick={() => onConfirmar(id)}>Confirmar</button>}
        {estado !== "CANCELADA" && <button className="boton boton--chico boton--claro" onClick={() => onCancelar(id)}>Cancelar</button>}
        <button className="boton boton--chico boton--peligro" onClick={() => onEliminar(id)}>Eliminar</button>
      </div>
    </article>
  );
}
