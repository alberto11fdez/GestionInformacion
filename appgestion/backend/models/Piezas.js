const mongoose = require('mongoose');

const piezaSchema = new mongoose.Schema({
  NOMBRE: { type: String, required: true },
  FABRICANTE: { type: String, required: true },
  ID_TIPO: { type: String, required: true }
}, { collection: 'tPiezas', versionKey : false});

module.exports = mongoose.model('Piezas', piezaSchema);
