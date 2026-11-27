// Formulario de nueva reserva: el responsable es el usuario que inició sesión
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearReserva, obtenerAmbientes, obtenerReservas } from "../services/api.js";
import { validarReserva } from "../utils/validaciones.js";
import { useAuth } from "../context/AuthContext.jsx";
import CampoFormulario from "../components/CampoFormulario.jsx";
import CampoSelect from "../components/CampoSelect.jsx";
import Alerta from "../components/Alerta.jsx";

const FORMULARIO_VACIO = { ambienteId: "", ficha: "", fecha: "", horaInicio: "", horaFin: "" };

export default function FormularioReserva() {
  const { usuario } = useAuth();
  const [datos, setDatos] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});
  const [existentes, setExistentes] = useState([]); // para detectar cruces antes de enviar
  const [ambientes, setAmbientes] = useState([]);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navegar = useNavigate();

  useEffect(() => {
    Promise.all([obtenerReservas(), obtenerAmbientes()])
      .then(([reservas, listaAmbientes]) => { setExistentes(reservas); setAmbientes(listaAmbientes); })
      .catch((e) => setMensaje({ tipo: "error", texto: e.message }));
  }, []);

  // Valida en tiempo real, sin recargar la página
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
      await crearReserva({
        ambienteId: Number(datos.ambienteId),
        responsableId: usuario.id,
        ficha: datos.ficha.trim(),
        fecha: datos.fecha,
        horaInicio: datos.horaInicio,
        horaFin: datos.horaFin,
      }); // el servidor la crea como PENDIENTE
      setMensaje({ tipo: "exito", texto: "Reserva registrada." });
      setTimeout(() => navegar("/"), 1200);
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message }); // mensaje real del servidor
    }
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <h1>Nueva reserva</h1>
      <Alerta tipo={mensaje.tipo} mensaje={mensaje.texto} />
      <CampoSelect etiqueta="Ambiente" nombre="ambienteId" valor={datos.ambienteId} onChange={manejarCambio} error={errores.ambienteId} opciones={ambientes} />
      <CampoFormulario etiqueta="Ficha" nombre="ficha" valor={datos.ficha} onChange={manejarCambio} error={errores.ficha} />
      <CampoFormulario etiqueta="Fecha" nombre="fecha" tipo="date" valor={datos.fecha} onChange={manejarCambio} error={errores.fecha} />
      <div className="fila">
        <CampoFormulario etiqueta="Hora de inicio" nombre="horaInicio" tipo="time" valor={datos.horaInicio} onChange={manejarCambio} error={errores.horaInicio} />
        <CampoFormulario etiqueta="Hora de fin" nombre="horaFin" tipo="time" valor={datos.horaFin} onChange={manejarCambio} error={errores.horaFin} />
      </div>
      <button className="boton" type="submit">Registrar reserva</button>
    </form>
  );
}
