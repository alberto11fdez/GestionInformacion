// authRoutes.js
const express = require('express');
const router = express.Router();  // Asegúrate de crear un router aquí
const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const Material = require('../models/Materiales');  // Ruta al modelo

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

router.get('/materiales', async (req, res) => {
  try {
    console.log('Buscando materiales...'); // Debug log
    const materiales = await Material.find({});  // Get all fields first
    console.log('Materiales encontrados:', materiales); // Debug log
    
    if (!materiales || materiales.length === 0) {
      return res.status(404).json({ message: 'No se encontraron materiales' });
    }
    
    res.json(materiales);
  } catch (error) {
    console.error('Error getting materiales:', error);
    res.status(500).json({ message: error.message });
  }
});

// Exporta el router para usarlo en server.js
module.exports = router;
