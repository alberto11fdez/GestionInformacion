const express = require('express');
const router = express.Router();  // Asegúrate de crear un router aquí
const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const Material = require('../models/Materiales');  // Ruta al modelo
const Piezas = require('../models/Piezas'); // Importa el modelo de Piezas


// Ruta de login
router.post('/login', async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const user = await User.findOne({ nombre: nombre });  // Buscar el usuario por nombre
    console.log("nombre:", nombre);
    
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Enviar el rol (rolName) del usuario en la respuesta
    res.status(200).json({
      message: 'Login exitoso',
      rolName: user.rolName,  // Aquí usamos rolName en lugar de role
    });
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

// Ruta de inserción de pieza en el backend
router.post('/insertar', async (req, res) => {
  const { NOMBRE, FABRICANTE, ID_TIPO } = req.body;

  // Verifica qué datos estás recibiendo
  console.log("Datos recibidos en el backend:", req.body);

  try {
    const nuevaPieza = new Piezas({
      NOMBRE: NOMBRE,   
      FABRICANTE: FABRICANTE,
      ID_TIPO: ID_TIPO
    });

    await nuevaPieza.save(); // Guardar en la base de datos
    
    res.status(201).json({ message: 'Pieza insertada exitosamente' });
  } catch (error) {
    console.error('Error al insertar la pieza:', error);
    res.status(400).json({ message: 'Error al insertar la pieza', error });
  }
});

// Obtener piezas por tipo de material (ID_TIPO)
router.get('/piezas/:idTipo', async (req, res) => {
  const { idTipo } = req.params;

  try {
    const piezas = await Piezas.find({ ID_TIPO: idTipo }).populate('ID_TIPO');  // 'populate' para obtener los detalles del material

    if (!piezas || piezas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron piezas para este material' });
    }

    res.json(piezas);
  } catch (error) {
    console.error('Error al obtener las piezas:', error);
    res.status(500).json({ message: 'Error en el servidor al obtener las piezas' });
  }
});

router.put('/actualizar/:id', async (req, res) => {
  try {
    const { nombre, fabricante, id_tipo } = req.body; // Desestructurando el body
    const { id } = req.params; // El ID de la pieza que vamos a actualizar

    // Ahora actualizamos la pieza
    const piezaActualizada = await Piezas.findByIdAndUpdate(
      id, 
      { NOMBRE: req.body.NOMBRE, FABRICANTE: req.body.FABRICANTE, ID_TIPO: req.body.ID_TIPO },
      { new: true }
    );

    res.json(piezaActualizada);
  } catch (error) {
    console.error('Error al actualizar la pieza:', error);
    res.status(500).json({ message: 'Error al actualizar la pieza', error });
  }
});

// Ruta para borrar una pieza
router.delete('/borrar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const piezaBorrada = await Piezas.findByIdAndDelete(id); // Eliminar la pieza por ID

    if (!piezaBorrada) {
      return res.status(404).json({ message: 'Pieza no encontrada' });
    }

    res.status(200).send();
  } catch (error) {
    console.error('Error al eliminar la pieza:', error);
    res.status(500).json({ message: 'Error al eliminar la pieza', error });
  }
});



module.exports = router;