import React, { useState, useEffect } from 'react';

const VueloForm = () => {
  const [aerolineas, setAerolinea] = useState([]);
  const [idAerolinea, setAerolineaId] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [fechaLlegada, setFechaLlegada] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    const fetchAerolineas = async () => {
      try {
        const response = await fetch('https://vuelosdev.azurewebsites.net/api/v1.0.0/Aerolineas');
        const data = await response.json();
        setAerolinea(data);
      } catch (error) {
        console.error('Error fetching aerolineas:', error);
      }
    };

    fetchAerolineas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vuelo = {
      idAerolinea,
      origen,
      destino,
      fechaSalida,
      fechaLlegada,
      precio: parseFloat(precio),
    };

    try {
      const response = await fetch('https://vuelosdev.azurewebsites.net/api/v1.0.0/vuelos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vuelo),
      });

      if (response.ok) {
        alert('Vuelo registrado con éxito');
      } else {
        alert('Error al registrar el vuelo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar el vuelo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Aerolínea:</label>
        <select
          value={idAerolinea}
          onChange={(e) => setAerolineaId(e.target.value)}
          required
        >
          <option value="">Seleccione una aerolínea</option>
          {aerolineas.map((aerolinea) => (
            <option key={aerolinea.idAerolinea} value={aerolinea.idAerolinea}>
              {aerolinea.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Origen:</label>
        <input
          type="text"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Destino:</label>
        <input
          type="text"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fecha de Salida:</label>
        <input
          type="datetime-local"
          value={fechaSalida}
          onChange={(e) => setFechaSalida(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fecha de Llegada:</label>
        <input
          type="datetime-local"
          value={fechaLlegada}
          onChange={(e) => setFechaLlegada(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar Vuelo</button>
    </form>
  );
};

export default VueloForm;
