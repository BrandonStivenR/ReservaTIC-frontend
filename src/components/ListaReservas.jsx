// Recorre las reservas y dibuja una tarjeta por cada una
import TarjetaReserva from "./TarjetaReserva.jsx";

export default function ListaReservas({ reservas }) {
  if (reservas.length === 0)
    return <p className="vacio">Aún no hay reservas. Crea la primera desde «Nueva reserva».</p>;
  return (
    <section className="lista">
      {reservas.map((r) => (
        <TarjetaReserva key={r.id} reserva={r} />
      ))}
    </section>
  );
}
