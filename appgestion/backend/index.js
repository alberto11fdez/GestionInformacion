const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes'); // Importar rutas desde la carpeta routes

const app = express();
const PORT = process.env.PORT || 5000;

//Conexion a mi BD = MONGO_URI=mongodb+srv://alberto11fdez:gestionProyecto@gestionproyect.6f1md.mongodb.net/?retryWrites=true&w=majority&appName=GestionProyect

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Example route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Rutas de autenticación
app.use('/api', authRoutes); // Todas las rutas de authRoutes tendrán el prefijo /api

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

