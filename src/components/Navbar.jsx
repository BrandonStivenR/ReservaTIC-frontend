// Encabezado: nombre del sistema y enlaces entre panel y formulario
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <span className="navbar__marca">ReservaTIC</span>
      <nav className="navbar__enlaces">
        <NavLink to="/" end>Panel</NavLink>
        <NavLink to="/nueva">Nueva reserva</NavLink>
      </nav>
    </header>
  );
}
