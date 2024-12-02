import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Login.css';

const Login = () => {
  const [nombre, setNombre] = useState('');  // Cambio de 'email' a 'nombre'
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', { nombre, password }); // Verifica que los datos sean correctos

    try {
      // Cambia 'email' a 'nombre' en la solicitud
      const response = await axios.post('http://localhost:5000/api/login', { nombre, password });
      navigate('/pagPrincipal'); // Redirige a la página principal
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error al conectar con el servidor');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="loginOrden">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="nombre">Nombre</label>  {/* Cambio de 'email' a 'nombre' */}
            <input
              type="text"
              id="nombre"  
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
