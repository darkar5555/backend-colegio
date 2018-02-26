var mongoose = require('mongoose');


var Schema = mongoose.Schema;


var colegioSchema = new Schema({

    nombre: {type: String, required: [true, 'El nombre es necesario']},
    direccion: {type: String, required: [true, 'La direccion es neceseracio']},
    director: {type: String, required: [true, 'EL director es necesario']},
    subdirector: {type: String, required: [true, 'El subdirector es necesario']}

});

module.exports = mongoose.model('Colegio', colegioSchema);