import { useApi } from '../api';
import './Tabla.css';

export default function ListaAlumnos() {
  const { datos: alumnos, cargando, error } = useApi('/api/alumnos');

  return (
    <div>
      <h2>Alumnos Inscritos</h2>

      {cargando && <p>Cargando alumnos...</p>}
      {error && <p role="alert">{error}</p>}
      {!cargando && !error && alumnos.length === 0 && <p>Todavía no hay alumnos registrados.</p>}

      {alumnos.length > 0 && (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Carrera</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((a) => (
                <tr key={a.id}>
                  <td>{a.matricula}</td>
                  <td>{a.nombre_completo}</td>
                  <td>{a.correo}</td>
                  <td>{a.carrera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
