// Encabezado: nombre del sistema, enlaces y datos de la sesión
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const navegar = useNavigate();

  const salir = () => {
    cerrarSesion();
    navegar("/login");
  };

  return (
    <header className="navbar">
      <span className="navbar__marca">ReservaTIC</span>
      {usuario && (
        <nav className="navbar__enlaces">
          <NavLink to="/" end>Panel</NavLink>
          <NavLink to="/nueva">Nueva reserva</NavLink>
          <span className="navbar__usuario">{usuario.nombre}</span>
          <button className="boton boton--claro" onClick={salir}>Cerrar sesión</button>
        </nav>
      )}
    </header>
  );
}
