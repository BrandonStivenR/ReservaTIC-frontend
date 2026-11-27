// Contexto de sesión: guarda el usuario que inició sesión y lo comparte con toda la aplicación
import { createContext, useContext, useState } from "react";

const CLAVE = "reservatic_usuario";
const AuthContext = createContext(null);

// Lee la sesión guardada (si el navegador no permite almacenamiento, no hay sesión)
function leerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion);

  const abrirSesion = (datos) => {
    setUsuario(datos);
    try { sessionStorage.setItem(CLAVE, JSON.stringify(datos)); } catch { /* sin almacenamiento */ }
  };
  const cerrarSesion = () => {
    setUsuario(null);
    try { sessionStorage.removeItem(CLAVE); } catch { /* sin almacenamiento */ }
  };

  return <AuthContext.Provider value={{ usuario, abrirSesion, cerrarSesion }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
