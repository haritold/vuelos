import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import VueloForm from './components/VueloForm';
import BuscarVuelos from './components/BuscarVuelos';
import ResultadosVuelos from './components/ResultadosVuelos';
import Login from './components/Login';
import Estadisticas from './components/Estadisticas';
import AerolineaForm from './components/AerolineaForm';
import Registro from './components/Registro';

function App() {
  const [vuelos, setVuelos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('idUser');
    if (token) {
      setIsAuthenticated(true);
      setUserId(token);
    }
  }, []);

  const buscarVuelos = async (criterios) => {
    const query = new URLSearchParams(criterios).toString();
    const token = localStorage.getItem('idUser');
    console.log(token);
    const response = await fetch(`https://vuelosdev.azurewebsites.net/api/v1.0.0/vuelos?${query}`);
    const data = await response.json();
    setVuelos(data);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserId(userId);
  };  

  const handleLogout = () => {
    localStorage.removeItem('idUser');
    setIsAuthenticated(false);
  };

  const handleReservar = async (idVuelo) => {
    const token = localStorage.getItem('idUser'); 
    const params = new URLSearchParams({
      usuario: token,
      vuelo: idVuelo
    }).toString();
    const response = await fetch(`https://vuelosdev.azurewebsites.net/api/v1.0.0/reservas?${params}`, {
      method: 'POST'
    });

    if (response.ok) {
      alert('Reserva realizada con éxito');
    } else {
      alert('Error al realizar la reserva');
    }
  };

  return (
    <Router>
      <div>
        <h1>Gestión de Vuelos</h1>
        <nav>
          <ul>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registro">Registro</Link>
              </li>
            </>
            ) : (
              <>
                <li>
                  <Link to="/buscar-vuelos">Buscar Vuelos</Link>
                </li>
                <li>
                  <Link to="/registrar-vuelo" >Agregar un vuelo</Link>
                </li>
                <li>
                  <Link to="/estadisticas">Estadísticas</Link>
                </li>
                <li>
                  <Link to="/aerolineas">Crear aerolinea</Link>
                </li>
                <li>
                <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
         <Routes>
         <Route path="/login" element={<Login onLogin={handleLogin} />} />
         <Route path="/registro" element={<Registro />}/>
         {isAuthenticated && (
            <>
              <Route path="/registrar-vuelo" element={<VueloForm />} />
              <Route
                path="/buscar-vuelos"
                element={
                  <div>
                    <BuscarVuelos onSearch={buscarVuelos} />
                    <ResultadosVuelos vuelos={vuelos} onReservar={handleReservar} />
                  </div>
                }
              />
              <Route path="/estadisticas" element={<Estadisticas />} />
              <Route path="/aerolineas" element={<AerolineaForm />} />
            </>
          )}
          <Route
            path="*"
            element={isAuthenticated ? <Navigate to="/buscar-vuelos" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
