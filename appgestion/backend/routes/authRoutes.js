const express = require('express');
const router = express.Router();  // Aquí defines el enrutador

// Importa cualquier modelo o servicio que necesites
// const User = require('../models/User');  // Ejemplo si tienes un modelo de usuario

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Datos recibidos en el backend:', req.body);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
    }

    // Lógica para verificar el usuario en la base de datos
    // Por ejemplo, buscando el usuario por email y comparando las contraseñas
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el backend:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});

module.exports = router;  // Exporta el enrutador
