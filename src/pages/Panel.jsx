// Pantalla de inicio: carga y muestra las reservas existentes
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerReservas } from "../services/reservaService.js";
import ListaReservas from "../components/ListaReservas.jsx";
import Alerta from "../components/Alerta.jsx";

export default function Panel() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");

  // useEffect: se ejecuta una vez al abrir el panel y pide los datos al servidor
  useEffect(() => {
    obtenerReservas().then(setReservas).catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <div className="titulo">
        <h1>Reservas</h1>
        <Link className="boton" to="/nueva">Nueva reserva</Link>
      </div>
      <Alerta tipo="error" mensaje={error} />
      <ListaReservas reservas={reservas} />
    </>
  );
}
