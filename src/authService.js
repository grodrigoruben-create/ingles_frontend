import { API_URL } from './api';

export const loginUser = async (usuario, password, tipo) => {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: usuario, password, tipo }),
  });

  const data = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(data?.messages?.error || 'Error al iniciar sesión');
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('rol', data.rol);
  return data;
};