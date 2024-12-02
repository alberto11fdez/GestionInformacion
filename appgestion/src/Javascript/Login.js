import React, { useState } from 'react';
import '../Css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Aquí puedes hacer la validación o llamar a una API para autenticar al usuario
    if (email === 'test@example.com' && password === 'password123') {
      alert('Inicio de sesión exitoso');
      // Redirigir o hacer lo que necesites después de un inicio de sesión exitoso
    } else {
      setErrorMessage('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
      <div className="login-container">
        <div className='loginOrden'>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
