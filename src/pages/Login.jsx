// Inicio de sesión: valida los datos, consulta al servidor y abre la sesión
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { iniciarSesion } from "../services/api.js";
import { validarLogin } from "../utils/validaciones.js";
import { useAuth } from "../context/AuthContext.jsx";
import CampoFormulario from "../components/CampoFormulario.jsx";
import Alerta from "../components/Alerta.jsx";

export default function Login() {
  const { usuario, abrirSesion } = useAuth();
  const [datos, setDatos] = useState({ usuario: "", contrasena: "" });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const navegar = useNavigate();

  if (usuario) return <Navigate to="/" replace />; // ya hay sesión

  const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const erroresActuales = validarLogin(datos);
    setErrores(erroresActuales);
    if (Object.keys(erroresActuales).length > 0) return;
    try {
      const respuesta = await iniciarSesion(datos.usuario.trim(), datos.contrasena);
      abrirSesion(respuesta.usuario);
      navegar("/");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <form className="formulario formulario--estrecho" onSubmit={manejarEnvio} noValidate>
      <h1>Iniciar sesión</h1>
      <Alerta tipo="error" mensaje={mensaje} />
      <CampoFormulario etiqueta="Usuario" nombre="usuario" valor={datos.usuario} onChange={manejarCambio} error={errores.usuario} />
      <CampoFormulario etiqueta="Contraseña" nombre="contrasena" tipo="password" valor={datos.contrasena} onChange={manejarCambio} error={errores.contrasena} />
      <button className="boton" type="submit">Entrar</button>
      <p className="pie">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </form>
  );
}
