var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();


var Usuario = require('../models/usuario');


app.post('/', (req, res, next)=>{

    res.status(200).json({
        ok: true,
        mensaje: 'Login post correcto'
    })

});


module.exports = app;