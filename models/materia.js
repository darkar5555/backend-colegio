var mongoose = require('mongoose');


var Schema = mongoose.Schema;


var materiaSchema = new Schema({

    nombre: {type: String, required: [true, 'El nombre de la materia es necesario']}

});


module.exports = mongoose.model('Materia', materiaSchema);