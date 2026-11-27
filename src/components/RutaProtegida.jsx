// Si no hay sesión iniciada, redirige al login; si la hay, muestra la pantalla pedida
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RutaProtegida() {
  const { usuario } = useAuth();
  return usuario ? <Outlet /> : <Navigate to="/login" replace />;
}
