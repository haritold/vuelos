import React, { useState } from 'react';

function CrearRegistro() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegistro = async (e) => {
    e.preventDefault();

    const nuevoUser = {nombre, telefono, correo, password};

    try {
        const response = await fetch('https://vuelosdev.azurewebsites.net/api/v1.0.0/Usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUser)
        });

        if (!response.ok) {
            throw new Error('Error al crear el usuario');
          }
        // Limpiar formulario después de éxito
        setNombre('');
        setTelefono('');
        setCorreo('');
        setPassword('');
        setError(null);

        alert('Usuario creado exitosamente');
        } catch (error) {
        console.error('Error:', error);
        setError('Error al crear el usuario');
        }
    };

  return (
    <div>
      <h2>Registro de nuevo usuario</h2>
      <form onSubmit={handleRegistro}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default CrearRegistro;