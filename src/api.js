import { useEffect, useState } from 'react';

// Puedes cambiarla creando un archivo .env con: VITE_API_URL=http://localhost:8080
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getToken = () => localStorage.getItem('token');
export const getRol = () => localStorage.getItem('rol');

export function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
}

// Revisa que el token exista y que no haya expirado (solo lee el campo "exp", no verifica la firma)
export function haySesion() {
  const token = getToken();
  if (!token) return false;
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(base64));
    return !exp || exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// fetch que agrega el token JWT y convierte los errores en mensajes legibles
export async function apiFetch(ruta, opciones = {}) {
  const headers = { Accept: 'application/json', ...(opciones.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const respuesta = await fetch(`${API_URL}${ruta}`, { ...opciones, headers });
  const datos = await respuesta.json().catch(() => null);

  if (respuesta.status === 401) {
    cerrarSesion();
    window.location.assign('/');
    throw new Error('Tu sesión expiró. Inicia sesión de nuevo.');
  }
  if (!respuesta.ok) {
    throw new Error(datos?.messages?.error || datos?.message || `Error ${respuesta.status} del servidor`);
  }
  return datos;
}

// CI4 puede responder [] o { data: [] }; esto acepta ambos
export const comoLista = (datos) => (Array.isArray(datos) ? datos : datos?.data ?? []);

// Hook para cargar una lista desde la API
export function useApi(ruta) {
  const [estado, setEstado] = useState({ datos: [], cargando: true, error: '' });

  useEffect(() => {
    let activo = true;
    apiFetch(ruta)
      .then((d) => activo && setEstado({ datos: comoLista(d), cargando: false, error: '' }))
      .catch((e) => activo && setEstado({ datos: [], cargando: false, error: e.message || 'No se pudo conectar con el servidor.' }));
    return () => {
      activo = false;
    };
  }, [ruta]);

  return estado;
}
