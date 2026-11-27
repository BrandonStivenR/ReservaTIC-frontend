// Registro de un usuario nuevo (el rol por defecto lo asigna el servidor: INSTRUCTOR)
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/api.js";
import { validarRegistro } from "../utils/validaciones.js";
import CampoFormulario from "../components/CampoFormulario.jsx";
import Alerta from "../components/Alerta.jsx";

export default function Registro() {
  const [datos, setDatos] = useState({ nombre: "", usuario: "", contrasena: "" });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navegar = useNavigate();

  const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const erroresActuales = validarRegistro(datos);
    setErrores(erroresActuales);
    if (Object.keys(erroresActuales).length > 0) return;
    try {
      await registrarUsuario({ ...datos, nombre: datos.nombre.trim(), usuario: datos.usuario.trim() });
      setMensaje({ tipo: "exito", texto: "Usuario registrado correctamente. Ahora inicia sesión." });
      setTimeout(() => navegar("/login"), 1500);
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  return (
    <form className="formulario formulario--estrecho" onSubmit={manejarEnvio} noValidate>
      <h1>Crear cuenta</h1>
      <Alerta tipo={mensaje.tipo} mensaje={mensaje.texto} />
      <CampoFormulario etiqueta="Nombre completo" nombre="nombre" valor={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
      <CampoFormulario etiqueta="Usuario" nombre="usuario" valor={datos.usuario} onChange={manejarCambio} error={errores.usuario} />
      <CampoFormulario etiqueta="Contraseña" nombre="contrasena" tipo="password" valor={datos.contrasena} onChange={manejarCambio} error={errores.contrasena} />
      <button className="boton" type="submit">Registrarme</button>
      <p className="pie">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </form>
  );
}
