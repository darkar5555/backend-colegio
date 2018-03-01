var mongoose = require('mongoose');


var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var alumnoSchema = new Schema({

    nombre: {type: String, required: [true, 'El nombre es requerido']},
    apellido_paterno: {type: String, required: [true, 'El apellido paterno es necesario']},
    apellido_materno: {type: String, required: [true, 'El apellido materno es necesario']},
    direccion: {type: String, required: [true, 'La direccion es requerida']},
    telefono: {type: Number, required: [true, 'El telefono es requerido']},
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true },
    colegio: { type: Schema.Types.ObjectId, ref: 'Colegio', required: true }


});
alumnoSchema.plugin(uniqueValidator, { message:'{PATH} debe de ser unico' });

module.exports = mongoose.model('Alumno', alumnoSchema);