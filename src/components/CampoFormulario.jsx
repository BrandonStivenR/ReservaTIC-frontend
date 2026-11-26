// Campo reutilizable: etiqueta + input + mensaje de error
// Props: etiqueta, nombre, valor, onChange, error, tipo (por defecto "text")
export default function CampoFormulario({ etiqueta, nombre, valor, onChange, error, tipo = "text" }) {
  return (
    <div className="campo">
      <label htmlFor={nombre}>{etiqueta}</label>
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={valor}
        onChange={onChange}
        aria-invalid={Boolean(error)}
      />
      {error && <small className="campo__error">{error}</small>}
    </div>
  );
}
