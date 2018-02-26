var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reporteSchema = new Schema({

    clase: {type: Schema.Types.ObjectId, ref: 'Clase', required: true},
    materia: {type: Schema.Types.ObjectId, ref: 'Materia', required: true},
    nota: {type: Schema.Types.ObjectId, ref: 'Nota', required: true}

});

module.exports = mongoose.model('Reporte', reporteSchema);