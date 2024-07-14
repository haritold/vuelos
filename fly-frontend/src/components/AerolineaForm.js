
import React, { useState } from 'react';

function CrearAerolineaForm() {
  const [nombre, setNombre] = useState('');
  const [pais, setPais] = useState('');
  const [sitioWeb, setSitioWeb] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaAerolinea = {
      nombre,
      pais,
      sitioWeb,
      telefono,
    };

    try {
      const response = await fetch('https://vuelosdev.azurewebsites.net/api/v1.0.0/Aerolineas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaAerolinea),
      });

      if (!response.ok) {
        throw new Error('Error al crear la aerolínea');
      }

      // Limpiar formulario después de éxito
      setNombre('');
      setPais('');
      setSitioWeb('');
      setTelefono('');
      setError(null);

      alert('Aerolínea creada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setError('Error al crear la aerolínea');
    }
  };

  return (
    <div>
      <h2>Crear Nueva Aerolínea</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>País:</label>
          <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} required />
        </div>
        <div>
          <label>Sitio Web:</label>
          <input type="text" value={sitioWeb} onChange={(e) => setSitioWeb(e.target.value)} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        <button type="submit">Crear Aerolínea</button>
      </form>
    </div>
  );
}

export default CrearAerolineaForm;