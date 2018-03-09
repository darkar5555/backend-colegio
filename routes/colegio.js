var express = require('express');

var app = express();

var Colegio = require('../models/colegio');

var mdAutenticacion = require('../middlewares/autenticacion');


//=======================================
//Obtener colegio
//=======================================
app.get('/', (req, res)=>{
    
    Colegio.find({})
        .exec((err, colegio)=>{

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener colegios',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                colegio: colegio
            });
        });

});

//============================================
//Crear un colegio
//============================================
app.post('/', mdAutenticacion.verificaToken, (req, res)=>{

    var body = req.body;
    var colegio = new Colegio({
        nombre: body.nombre,
        direccion: body.direccion,
        director: body.director,
        subdirector: body.subdirector
    });

    colegio.save((err, colegioGuardado)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear colegio',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Creado exitosamente',
            colegio: colegioGuardado
        });
    });

});

//=============================================
//Actualizar un colegio
//=============================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;
    var body = req.body;

    Colegio.findById(id, (err, colegio)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al encontrar el colegio',
                errors: err
            });
        }

        if (!colegio) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El colegio con ese id ' + id + ' no existe',
                    errors: {message: 'No existe una nota con ese ID'}
                });
            }
        }

        colegio.nombre = body.nombre;
        colegio.direccion = body.direccion;
        colegio.director = body.director;
        colegio.subdirector = body.subdirector;

        colegio.save((err, colegioGuardado)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al guardar colegio',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: 'Colegio guardado',
                colegio: colegioGuardado
            });
        });
    });
});

//==============================================
//Eliminar un colegio
//==============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;

    Colegio.findByIdAndRemove(id, (err, colegioBorrado)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar mensaje',
                errors: err
            });
        }

        if (!colegioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El colegio con ese id ' + id + ' no existe',
                errors: {message:'No existe un colegio con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Colegio borrado',
            colegio: colegioBorrado
        });
    });

});


module.exports = app;