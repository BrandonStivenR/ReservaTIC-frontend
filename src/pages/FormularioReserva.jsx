// Formulario de solicitud de reserva con validaciones en tiempo real
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearReserva, obtenerReservas } from "../services/reservaService.js";
import { validarReserva } from "../utils/validaciones.js";
import CampoFormulario from "../components/CampoFormulario.jsx";
import Alerta from "../components/Alerta.jsx";

const FORMULARIO_VACIO = {
  sala: "", usuario: "", ficha: "", fecha: "",
  horaInicio: "", horaFin: "", estado: "Pendiente",
};

export default function FormularioReserva() {
  const [datos, setDatos] = useState(FORMULARIO_VACIO); // lo que escribe el usuario
  const [errores, setErrores] = useState({});           // errores por campo
  const [existentes, setExistentes] = useState([]);     // para detectar cruces de horario
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navegar = useNavigate();

  useEffect(() => {
    obtenerReservas().then(setExistentes).catch(() => setExistentes([]));
  }, []);

  // Actualiza el campo modificado y valida de inmediato, sin recargar la página
  const manejarCambio = (e) => {
    const nuevos = { ...datos, [e.target.name]: e.target.value };
    setDatos(nuevos);
    setErrores(validarReserva(nuevos, existentes));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const erroresActuales = validarReserva(datos, existentes);
    setErrores(erroresActuales);
    if (Object.keys(erroresActuales).length > 0) {
      setMensaje({ tipo: "error", texto: "Revisa los campos marcados antes de enviar." });
      return;
    }
    try {
      await crearReserva(datos);
      setMensaje({ tipo: "exito", texto: "Reserva registrada." });
      setTimeout(() => navegar("/"), 1200); // vuelve al panel tras confirmar
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <h1>Nueva reserva</h1>
      <Alerta tipo={mensaje.tipo} mensaje={mensaje.texto} />
      <CampoFormulario etiqueta="Sala" nombre="sala" valor={datos.sala} onChange={manejarCambio} error={errores.sala} />
      <CampoFormulario etiqueta="Usuario" nombre="usuario" valor={datos.usuario} onChange={manejarCambio} error={errores.usuario} />
      <CampoFormulario etiqueta="Ficha" nombre="ficha" valor={datos.ficha} onChange={manejarCambio} error={errores.ficha} />
      <CampoFormulario etiqueta="Fecha" nombre="fecha" tipo="date" valor={datos.fecha} onChange={manejarCambio} error={errores.fecha} />
      <div className="fila">
        <CampoFormulario etiqueta="Hora de inicio" nombre="horaInicio" tipo="time" valor={datos.horaInicio} onChange={manejarCambio} error={errores.horaInicio} />
        <CampoFormulario etiqueta="Hora de fin" nombre="horaFin" tipo="time" valor={datos.horaFin} onChange={manejarCambio} error={errores.horaFin} />
      </div>
      <div className="campo">
        <label htmlFor="estado">Estado</label>
        <select id="estado" name="estado" value={datos.estado} onChange={manejarCambio}>
          <option>Pendiente</option>
          <option>Confirmada</option>
          <option>Cancelada</option>
        </select>
      </div>
      <button className="boton" type="submit">Registrar reserva</button>
    </form>
  );
}
