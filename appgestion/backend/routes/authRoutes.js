// authRoutes.js
const express = require('express');
const router = express.Router();  // Asegúrate de crear un router aquí
const User = require('../models/User'); // Asegúrate de que la ruta sea correcta

// Ruta de login
router.post('/login', async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const user = await User.findOne({nombre: nombre});  // Busca el usuario por nombre
    console.log("nombre:", nombre);
    
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).send();
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Exporta el router para usarlo en server.js
module.exports = router;
