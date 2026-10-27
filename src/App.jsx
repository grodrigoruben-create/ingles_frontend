import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './paginas/home';
import SubirMaterial from './paginas/SubirMaterial';
import VerPuntuaciones from './paginas/VerPuntuaciones';
import ListaAlumnos from './paginas/ListaAlumnos';
import ListaMaterial from './paginas/ListaMaterial';
import Login from "./paginas/Login"; // Asegúrate de que Login.jsx esté en la misma carpeta que App.jsx

import './App.css'; 

function MainLayout() {
  const location = useLocation();

  return (
    <div className="app-container" style={{ maxWidth: '100%', width: '100%' }}> 
      
      {/* Ocultamos el botón de volver si estamos en la pantalla de Login (ruta "/") */}
      {location.pathname !== '/' && (
        <Link to="/" className="btn-volver">
          ← Volver al Inicio
        </Link>
      )}

      <Routes>
        {/* El Login es la pantalla principal */}
        <Route path="/" element={<Login />} />
        
        {/* El menú de opciones ahora está en /inicio */}
        <Route path="/inicio" element={<Home />} />
        
        <Route path="/subir-material" element={<SubirMaterial />} />
        <Route path="/puntuaciones" element={<VerPuntuaciones />} />
        <Route path="/alumnos" element={<ListaAlumnos />} />
        <Route path="/material" element={<ListaMaterial />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;