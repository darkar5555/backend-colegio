var mongoose = require('mongoose');


var Schema = mongoose.Schema;


var colegioSchema = new Schema({

    nombre: {type: String, required: [true, 'El nombre es necesario']},

});

module.exports = mongoose.model('Colegio', colegioSchema);