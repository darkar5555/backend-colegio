// requires

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Inicializar variables
var app = express();


//Body parser
//Parse application/x-www-form-urlencoded
//Aqui tenemos un parse para poder entrar datos en el postman en la parte de x-www-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//importar routes
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');


//Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/colegioDB', (err, res)=>{
    if (err) throw err;
    console.log('Base de datos: online');
});


//Rutas 
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//Escuchar peticiones
app.listen(3000, ()=>{
    console.log('Express server corriendo en el pueto 3000 online')
});
