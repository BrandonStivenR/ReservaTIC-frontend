// Componente principal: define el encabezado y qué pantalla se muestra en cada ruta
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Panel from "./pages/Panel.jsx";
import FormularioReserva from "./pages/FormularioReserva.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Panel />} />
          <Route path="/nueva" element={<FormularioReserva />} />
        </Routes>
      </main>
    </>
  );
}
