var express = require('express');

var app = express();

var Materia = require('../models/materia');

var mdAutenticacion = require('../middlewares/autenticacion');

//=================================
//Obtener las materias
//=================================
app.get('/', (req, res)=>{

    Materia.find({})
        .exec((err, materias)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al obtener materias',
                    errors: err
                });
            }

            Materia.count({},(err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    materias: materias,
                    conteo: conteo 
                });
            });
        });
});

//=======================================
//Crear una materia
//=======================================
app.post('/', mdAutenticacion.verificaToken,(req, res)=>{

    var body = req.body;
    var materia = new Materia({
        nombre: body.nombre
    });
    materia.save((err, materiaGuardada)=>{

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear materia',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Materia creada con exito',
            materia: materiaGuardada
        });
    });

});


//============================================
//Actualizar una materia
//============================================
app.put('/:id', mdAutenticacion.verificaToken,(req, res)=>{

    var id = req.params.id;
    var body = req.body;

    Materia.findById(id, (err, materia)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar materia',
                errors: err
            });
        }

        if (!materia) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La materia con el id' + id + ' no existe',
                    errors: {message: 'No existe una materia con ese ID'}
                });
            }
        }

        materia.nombre = body.nombre;
        materia.save((err, materiaGuardada)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar materia',
                    errors: err
                });
            }

            res.status(201).json({
                ok: true,
                mensaje: 'Materia actualizada',
                materia: materiaGuardada
            });
        });
    });

});

//===================================
//Borrar una materia
//===================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;

    Materia.findByIdAndRemove(id, (err, materiaBorrada)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al borrar materia',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            mensaje: 'Borrado exitosamente',
            materia: materiaBorrada
        });
    });
});

module.exports = app;