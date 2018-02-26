var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var claseSchema = new Schema({

    codigo: {type: String, unique: true, required:[ true, 'el codigo es necesario']},
    nombre: {type: String, required:[true, 'El nombre es requerido']},
    materia: {type: Schema.Types.ObjectId, ref: 'Materia', required: true},
    profesor: {type: Schema.Types.ObjectId, ref: 'Profesor', required: true},
    alumno: {type: Schema.Types.ObjectId, ref: 'Alumno', required: true}

});

usuarioSchema.plugin(uniqueValidator, { message:'{PATH} debe de ser unico' });

module.exports = mongoose.model('Clase', claseSchema);
