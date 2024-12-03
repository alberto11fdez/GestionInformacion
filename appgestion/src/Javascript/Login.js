import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Asegúrate de importar useNavigate

const Login = () => {
  const navigate = useNavigate();  // Usa 'navigate' en lugar de 'history'
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { nombre, password });
      
      // Aquí capturamos el rol del usuario (rolName) desde la respuesta
      const { rolName } = response.data;

      // Almacenar el rolName en el localStorage
      localStorage.setItem('rolName', rolName);  // Guardamos el rol del usuario en el localStorage
      
      // Redirigir a la página principal o cualquier otra página
      navigate('/pagPrincipal');  // O cualquier ruta a la que quieras redirigir al usuario después del login
    } catch (error) {
      alert('Error de autenticación');
    }
  };

  return (
    <div className='loginTodo'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='nombreTodo'>
          <label>Nombre</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Ingrese su nombre"
          />
        </div>
        <div className='contraseñaTodo'>
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
