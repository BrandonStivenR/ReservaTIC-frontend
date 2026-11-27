// Panel principal: lista las reservas, permite filtrarlas y gestionarlas
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerReservas, confirmarReserva, cancelarReserva, eliminarReserva } from "../services/api.js";
import ListaReservas from "../components/ListaReservas.jsx";
import Alerta from "../components/Alerta.jsx";

export default function Panel() {
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [error, setError] = useState("");

  // Pide las reservas al servidor según el filtro de estado
  const cargar = useCallback(() => {
    obtenerReservas(filtro)
      .then((datos) => { setReservas(datos); setError(""); })
      .catch((e) => setError(e.message));
  }, [filtro]);

  useEffect(cargar, [cargar]);

  // Ejecuta una acción sobre una reserva y vuelve a cargar la lista
  const ejecutar = (accion) => async (id) => {
    try {
      await accion(id);
      cargar();
    } catch (e) {
      setError(e.message);
    }
  };
  const eliminar = (id) => {
    if (window.confirm("¿Eliminar definitivamente esta reserva?")) ejecutar(eliminarReserva)(id);
  };

  return (
    <>
      <div className="titulo">
        <h1>Reservas</h1>
        <Link className="boton" to="/nueva">Nueva reserva</Link>
      </div>
      <div className="campo campo--filtro">
        <label htmlFor="filtro">Filtrar por estado</label>
        <select id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Todas</option>
          <option value="PENDIENTE">Pendientes</option>
          <option value="CONFIRMADA">Confirmadas</option>
          <option value="CANCELADA">Canceladas</option>
        </select>
      </div>
      <Alerta tipo="error" mensaje={error} />
      <ListaReservas reservas={reservas} onConfirmar={ejecutar(confirmarReserva)} onCancelar={ejecutar(cancelarReserva)} onEliminar={eliminar} />
    </>
  );
}
