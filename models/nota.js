var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var notaSchema = new Schema({

    permanente1: {type: Number, required: false},
    parcial: {type: Number, required: false},
    permanente2: {type: Number, required: false},
    final: {type: Number, required: false},
    alumno: {type: Schema.Types.ObjectId, ref: 'Alumno', required: true},
    materia: {type: Schema.Types.ObjectId, ref: 'Materia', required: true}
    
});

module.exports = mongoose.model('Nota', notaSchema);