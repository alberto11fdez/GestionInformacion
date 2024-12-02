import React, { useState } from 'react';
import '../Css/Login.css';  // Importa el CSS

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Validación simple de que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    // Validación simple para campos no vacíos
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Por favor, complete todos los campos');
      return;
    }

    // Aquí puedes hacer la validación o llamada a la API para registrar al usuario
    alert('Registro exitoso');
    // Redirigir o realizar alguna acción tras el registro exitoso
  };

  return (
    <div className="login-container">
      <div className="loginOrden">
        <h2>Registrarse</h2>
        <form onSubmit={handleRegister}>
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
          <div>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
