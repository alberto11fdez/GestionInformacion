const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Asegúrate de que estás usando la base de datos y la colección correcta.
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  password: { type: String, required: true },
  rolName: { type: String},
}, { collection: 'tUsuario' });  // Asegúrate de que el nombre de la colección sea 'tUsuario'

// Middleware para encriptar contraseñas antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
