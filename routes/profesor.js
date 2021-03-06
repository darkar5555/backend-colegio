var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

var Profesor = require('../models/profesor');


//==============================
//Obtener todos los profesores
//==============================
app.get('/', (req, res, next)=>{

    Profesor.find({})
        .populate('usuario', 'nombre email role')
        .populate('colegio')
        .exec((err, profesores)=>{

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener profesores',
                    errors: err
                })
            }

            Profesor.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    profesores: profesores,
                    total: conteo
                });
            });
        });
});

//=============================================
//Obtener un profesor de acuardo al id
//=============================================
app.get('/:id', (req, res, next)=>{
    var id = req.params.id;
    Profesor.findById(id)
            .populate('usuario', 'nombre email role')
            .populate('colegio')
            .exec((err, profesor)=>{
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al obtener el profesor',
                        error: err
                    });
                }
                if (!profesor) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El profesor con ese id' + id + 'no existe',
                        errors: {message: 'No existe un profesor con ese ID'}
                    });
                }

                res.status(200).json({
                    ok: true,
                    profesor: profesor
                });
            });
});


//==================================
//Crear un profesor
//==================================
app.post('/', mdAutenticacion.verificaToken,(req, res)=>{

    var body = req.body;
    var profesor = new Profesor({
        nombre: body.nombre,
        apellido_paterno: body.apellido_paterno,
        apellido_materno: body.apellido_materno,
        dni: body.dni,
        direccion: body.direccion,
        telefono: body.telefono,
        usuario: body.usuario,
        colegio: body.colegio

    });

    profesor.save((err, profesorGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear profesor',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            mensaje: 'Profesor creado',
            profesor: profesorGuardado
        });

    });
});

//========================================
//Actualizar un profesor
//========================================
app.put('/:id', mdAutenticacion.verificaToken,(req, res)=>{

    var id = req.params.id;
    var body = req.body;

    Profesor.findById(id, (err, profesor)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al encontrar profesor',
                errors: err
            });
        }
        if (!profesor) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El profesor con el '+ id+ 'no existe',
                    errors: {message: 'No existe un profesor con ese ID'}
                });
            }
        }
        profesor.nombre = body.nombre;
        profesor.apellido_paterno = body.apellido_paterno;
        profesor.apellido_materno = body.apellido_materno;
        profesor.dni = body.dni,
        profesor.direccion = body.direccion,
        profesor.telefono = body.telefono,
        profesor.usuario = body.usuario,
        profesor.colegio = body.colegio

        profesor.save((err, profesorGuardado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar profesor',
                    errors: err
                })
            }
            res.status(200).json({
                ok: true,
                profesorGuardado: profesorGuardado
            });
        });
    });

});

//=========================================
//Borrar un profesor
//=========================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;

    Profesor.findByIdAndRemove(id, (err, profesorBorrado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al borrar profesor',
                errors: err
            });
        }

        if (!profesorBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un profesor con ese id',
                errors: {message:'No existe un profesor con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            profesor: profesorBorrado
        })
    });

});

module.exports = app;