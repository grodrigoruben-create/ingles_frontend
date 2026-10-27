import { useApi } from '../api';
import './Tabla.css';

export default function VerPuntuaciones() {
  const { datos: calificaciones, cargando, error } = useApi('/api/calificaciones');

  return (
    <div>
      <h2>Puntuaciones de los Alumnos</h2>

      {cargando && <p>Cargando puntuaciones...</p>}
      {error && <p role="alert">{error}</p>}
      {!cargando && !error && calificaciones.length === 0 && <p>Todavía no hay puntuaciones registradas.</p>}

      {calificaciones.length > 0 && (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Nivel</th>
                <th>Puntuación</th>
                <th>Prueba</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {calificaciones.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre_completo || c.alumno_id}</td>
                  <td>{c.nivel}</td>
                  <td>{c.puntuacion}</td>
                  <td>{c.tipo_prueba}</td>
                  <td>{c.created_at ? new Date(c.created_at).toLocaleDateString('es-MX') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
