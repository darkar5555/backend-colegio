var express = require('express');

var app = express();

var Alumno = require('../models/alumno');

//===============================
// Get todos los alumnos
//===============================
app.get('/',(req, res, next)=>{

    Alumno.find({})
        .populate('usuario', 'nombre email')
        .populate('colegio')
        .exec((err, alumnos)=>{

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando medicos',
                    errors: err
                });
            }

            Alumno.count({}, (err,conteo)=>{
                    
                res.status(200).json({
                    ok: true,
                    alumnos: alumnos,
                    total: conteo
                });

            });
        });

});


//======================================
// Crear a un alumno
//======================================
// app.post('/', (req, res, next)=>{



// });

module.exports = app;