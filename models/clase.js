var mongoose = require('mongoose');

// var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var claseSchema = new Schema({

    codigo: {type: String, required:[ true, 'el codigo es necesario']},
    nombre: {type: String, required:[true, 'El nombre es requerido']},
    alumno: {type: Schema.Types.ObjectId, ref: 'Alumno', required: false},
    profesor: {type: Schema.Types.ObjectId, ref: 'Profesor', required: true},

});

// claseSchema.plugin(uniqueValidator, { message:'{PATH} debe de ser unico' });

module.exports = mongoose.model('Clase', claseSchema);
