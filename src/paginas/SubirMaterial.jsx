import { useState } from 'react';
import { apiFetch, useApi } from '/src/api.js';
import './SubirMaterial.css';

export default function SubirMaterial() {
  const [titulo, setTitulo] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [nivel, setNivel] = useState('1');
  const [categoriaId, setCategoriaId] = useState('');

  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const { datos: categorias, error: errorCategorias } =
    useApi('/api/categorias');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje({
        texto: 'Selecciona un archivo antes de continuar.',
        tipo: 'error',
      });
      return;
    }

    setEnviando(true);
    setMensaje({ texto: '', tipo: '' });

    const datos = new FormData();
    datos.append('nombre', titulo);
    datos.append('nivel', nivel);
    datos.append('categoria_id', categoriaId);
    datos.append('archivo', archivo);

    try {
      await apiFetch('/api/materiales', {
        method: 'POST',
        body: datos,
      });

      setMensaje({
        texto: '¡Material subido correctamente!',
        tipo: 'ok',
      });

      setTitulo('');
      setArchivo(null);
      setNivel('1');
      setCategoriaId('');

      // Limpiar el input de archivo
      e.target.reset();
    } catch (error) {
      setMensaje({
        texto: error.message || 'No se pudo subir el material.',
        tipo: 'error',
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Subir Nuevo Material</h2>
      <p>Agrega recursos para los alumnos.</p>

      <div className="contenedorFormulario">
        <form onSubmit={handleSubmit}>
          <div className="grupo">
            <label htmlFor="nombre">Nombre de la tarjeta:</label>
            <input
              id="nombre"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej. Apple"
              required
            />
          </div>

          <div className="grupo">
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>

              {(categorias ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>

            {errorCategorias && (
              <small role="alert" style={{ color: 'red' }}>
                {errorCategorias}
              </small>
            )}
          </div>

          <div className="grupo">
            <label htmlFor="nivel">Nivel de dificultad:</label>
            <select
              id="nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            >
              <option value="1">Básico</option>
              <option value="2">Intermedio</option>
              <option value="3">Avanzado</option>
            </select>
          </div>

          <div className="grupo">
            <label htmlFor="archivo">
              Selecciona una imagen o archivo:
            </label>
            <input
              id="archivo"
              type="file"
              accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
              onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
              required
            />

            {archivo && (
              <small>
                Archivo seleccionado: {archivo.name}
              </small>
            )}
          </div>

          {mensaje.texto && (
            <p
              role={mensaje.tipo === 'error' ? 'alert' : 'status'}
              className={`mensaje mensaje--${mensaje.tipo}`}
            >
              {mensaje.texto}
            </p>
          )}

          <button
            type="submit"
            className="botonSubir"
            disabled={enviando}
          >
            {enviando ? 'Subiendo archivo...' : 'Guardar material'}
          </button>
        </form>
      </div>
    </div>
  );
}