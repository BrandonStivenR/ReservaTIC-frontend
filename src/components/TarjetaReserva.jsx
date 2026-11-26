// Muestra los datos de una sola reserva
export default function TarjetaReserva({ reserva }) {
  const { id, usuario, ficha, sala, fecha, horaInicio, horaFin, estado } = reserva;
  return (
    <article className="tarjeta">
      <header>
        <h3>{sala}</h3>
        <span className={`estado estado--${String(estado).toLowerCase()}`}>{estado}</span>
      </header>
      <p>Reserva #{id} · {usuario} · Ficha {ficha}</p>
      <p>{fecha}, de {horaInicio} a {horaFin}</p>
    </article>
  );
}
