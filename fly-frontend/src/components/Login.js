import React, { useState } from 'react';

function Login({ onLogin }) {
  const [correo, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const params = new URLSearchParams({
            correo: correo,
            password: password
        }).toString();

        const response = await fetch(`https://vuelosdev.azurewebsites.net/api/v1.0.0/Usuario/login?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('idUser', data.idUsuario);
        onLogin(data); // Asumiendo que onLogin manejará el estado de autenticación
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error de inicio de sesión');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="correo"
            value={correo}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
