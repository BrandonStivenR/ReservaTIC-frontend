// Lista desplegable reutilizable: etiqueta + select + mensaje de error
// Props: etiqueta, nombre, valor, onChange, error, opciones [{ id, nombre }]
export default function CampoSelect({ etiqueta, nombre, valor, onChange, error, opciones }) {
  return (
    <div className="campo">
      <label htmlFor={nombre}>{etiqueta}</label>
      <select id={nombre} name={nombre} value={valor} onChange={onChange} aria-invalid={Boolean(error)}>
        <option value="">Selecciona una opción</option>
        {opciones.map((o) => (
          <option key={o.id} value={o.id}>{o.nombre}</option>
        ))}
      </select>
      {error && <small className="campo__error">{error}</small>}
    </div>
  );
}