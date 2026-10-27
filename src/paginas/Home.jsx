import { Link, useNavigate } from 'react-router-dom';
import { cerrarSesion, getRol } from '../api';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const esDocente = getRol() === 'docente';

  const salir = () => {
    cerrarSesion();
    navigate('/', { replace: true });
  };

  return (
    <div className="home-container">
      <h1>Portal de Inglés</h1>
      <p>Selecciona una opción en los siguientes bloques:</p>

      <div className="bloques-container">
        {esDocente && (
          <Link to="/subir-material" className="bloque-link">Subir Material</Link>
        )}
        <Link to="/puntuaciones" className="bloque-link">Ver Puntuaciones</Link>
        {esDocente && (
          <Link to="/alumnos" className="bloque-link">Lista de Alumnos</Link>
        )}
        <Link to="/material" className="bloque-link">Lista de Material</Link>
      </div>

      <button type="button" className="btn-salir" onClick={salir}>
        Cerrar sesión
      </button>
    </div>
  );
}
