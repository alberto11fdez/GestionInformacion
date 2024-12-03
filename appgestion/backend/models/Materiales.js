// models/Material.js
const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  ID_TIPO: {
    type: String,
    required: true,
  },
    NOMBRE: {
    type: String,
    required: true,
  }
}, { collection: 'tTipoPieza' });

module.exports = mongoose.model('Material', materialSchema);
