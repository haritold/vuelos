import React, { useState } from 'react';

const BuscarVuelos = ({ onSearch }) => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [fechaLlegada, setFechaLlegada] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ origen, destino, fechaSalida, fechaLlegada });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-busqueda">
      <div className="filtro">
        <label>Origen:</label>
        <input type="text" value={origen} onChange={(e) => setOrigen(e.target.value)} />
      </div>
      <div className="filtro">
        <label>Destino:</label>
        <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} />
      </div>
      <div className="filtro">
        <label>Fecha de Salida:</label>
        <input type="date" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} />
      </div>
      <div className="filtro">
        <label>Fecha de Llegada:</label>
        <input type="date" value={fechaLlegada} onChange={(e) => setFechaLlegada(e.target.value)} />
      </div>
      <button type="submit" className="btn-filtrar">Buscar Vuelos</button>
    </form>
  );
};

export default BuscarVuelos;
