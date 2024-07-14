import React, { useState, useEffect } from 'react';

function Estadisticas() {
  const [aerolineasConMasReservas, setAerolineasConMasReservas] = useState([]);
  const [numeroAerolineasRegistradas, setNumeroAerolineasRegistradas] = useState(0);

  useEffect(() => {
    async function fetchAerolineasMasReservadas() {
      const response = await fetch('https://vuelosdev.azurewebsites.net/api/v1.0.0/Aerolineas/estadisticas');
      const data = await response.json();
      setAerolineasConMasReservas(data);
    }

    async function fetchNumeroAerolineasRegistradas() {
      const response = await fetch('https://vuelosdev.azurewebsites.net/api/v1.0.0/Aerolineas/estadisticas/total');
      const data = await response.json();
      setNumeroAerolineasRegistradas(data);
    }

    fetchAerolineasMasReservadas();
    fetchNumeroAerolineasRegistradas();
  }, []);

  return (
    <div>
      <h2>Estadísticas</h2>
      <div>
        <h3>Aerolíneas con Más Reservas</h3>
        <ul>
          {aerolineasConMasReservas.map((aerolinea, index) => (
            <li key={index}>
              {aerolinea.Aerolinea}: {aerolinea.TotalReservas} reservas
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Número de Aerolíneas Registradas</h3>
        <p>{numeroAerolineasRegistradas}</p>
      </div>
    </div>
  );
}

export default Estadisticas;
