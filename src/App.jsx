// Mapa de navegación: /login y /registro son públicas; el panel y el formulario requieren sesión
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Panel from "./pages/Panel.jsx";
import FormularioReserva from "./pages/FormularioReserva.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="contenedor">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route element={<RutaProtegida />}>
            <Route path="/" element={<Panel />} />
            <Route path="/nueva" element={<FormularioReserva />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
