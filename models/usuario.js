var mongoose = require('mongoose');

//Inicializamos un validador para que nos mande cuando haya un error
var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

//Aqui tenemos toso los roles que podremos tener en el sistema
var rolesValidos = {
    values: ['ADMIN_ROLE', 'PROFESOR_ROLE', 'ALUMNO_ROLE'],
    message: '{VALUE} no es un rol permitido'
}


var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email debe ser unico y necesario']},
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: {type: String, required: false},
    //Para poder darnos cuenta y que acepte solo los roles que queremos usamos
    //enum rolesValidos para que solo puedan ser esos roles
    role: { type: String, required: true, enum: rolesValidos }

});
//Aqui usamos el validador para que nos mande un mensaje mejor dicho
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);