// Recorre las reservas y dibuja una tarjeta por cada una
import TarjetaReserva from "./TarjetaReserva.jsx";

export default function ListaReservas({ reservas, onConfirmar, onCancelar, onEliminar }) {
  if (reservas.length === 0) return <p className="vacio">No hay reservas para mostrar.</p>;
  return (
    <section className="lista">
      {reservas.map((r) => (
        <TarjetaReserva key={r.id} reserva={r} onConfirmar={onConfirmar} onCancelar={onCancelar} onEliminar={onEliminar} />
      ))}
    </section>
  );
}
