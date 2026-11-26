// Mensaje de éxito o error con el mismo estilo en toda la aplicación
// Props: tipo ("exito" | "error") y mensaje
export default function Alerta({ tipo, mensaje }) {
  if (!mensaje) return null;
  return (
    <div className={`alerta alerta--${tipo}`} role="alert">
      {mensaje}
    </div>
  );
}
