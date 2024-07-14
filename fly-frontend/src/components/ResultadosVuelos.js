import React from 'react';
import { formatCurrency } from '../utils/formatoMoneda';

const ResultadosVuelos = ({ vuelos, onReservar }) => {
  return (
    <div>
      <h2>Resultados de la Búsqueda</h2>
      {vuelos.length === 0 ? (
        <p>No se encontraron vuelos.</p>
      ) : (
      <table className='tableL'>
        <thead>
          <tr>
            <th>Aerolínea</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha de Salida</th>
            <th>Fecha de Llegada</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {vuelos.map((vuelo) => (
            <tr key={vuelo.IdVuelo}>
              <td>{vuelo.IdAerolineaNavigation.Nombre}</td>
              <td>{vuelo.Origen}</td>
              <td>{vuelo.Destino}</td>
              <td>{new Date(vuelo.FechaSalida).toLocaleString()}</td>
              <td>{new Date(vuelo.FechaLlegada).toLocaleString()}</td>
              <td>{formatCurrency(vuelo.Precio)}</td>
              <td>
                  <button onClick={() => onReservar(vuelo.IdVuelo)}>Reservar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default ResultadosVuelos;
