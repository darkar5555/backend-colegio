var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var profesorSchema = new Schema({

    nombre: {type: String, required: [true, 'El nombre es requerido']},
    apellido_paterno: {type: String, required: [true, 'El apellido materno es necesario']},
    apellido_materno: {type: String, required: [true, 'El apellido materno es necesario']},
    dni: {type: Number, unique: true, required: [true, 'El dni debe de ser unico']},
    direccion: {type: String, required: [true, 'La direccion es necesaria']},
    telefono: {type: Number, required: [true, 'El telefono es necesario']},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},

}, {collection: 'profesores'});

usuarioSchema.plugin(uniqueValidator, { message:'{PATH} debe de ser unico' });

module.exports = mongoose.model('Profesor', profesorSchema);