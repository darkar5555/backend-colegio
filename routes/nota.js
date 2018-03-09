var express = require('express');

var app = express();

var mdAutenticacion = require('../middlewares/autenticacion');

var Nota = require('../models/nota');

//=======================================
//Obtener notas de los alumnos por grado
//=======================================
app.get('/', (req, res)=>{

    Nota.find({})
        .sort({"alumno.nombre" : 1})
        .populate('alumno')
        .populate('materia')
        .exec((err, notas)=>{

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se pudo obtener las notas',
                    errors: err
                });
            }

            Nota.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    notas: notas,
                    total: conteo 
                });
            });
        });
});

//========================================
//Crear la nota
//========================================
app.post('/', mdAutenticacion.verificaToken,(req, res)=>{

    var body = req.body;
    var nota = new Nota({
        permanente1: body.permanente1,
        permanente2: body.permanente2,
        parcial: body.parcial,
        final: body.final,
        alumno: body.alumno,
        materia: body.materia
    });

    nota.save((err, alumnoGuardado)=>{

        if (err) {
            return res.status(200).json({
                ok: false,
                mensaje: 'No se pudo guardar el alumno',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            alumno: alumnoGuardado
        });

    });

});

//==============================================
//Actualizar nota
//==============================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;
    var body = req.body;

    Nota.findById(id, (err, nota)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar la nota',
                errors: err
            });
        }

        if (!nota) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La nota con el id ' + id + 'no existe',
                    errors: {message: 'No existe una nota con ese ID'}
                });
            }
        }
         
        nota.permanente1 = body.permanente1,
        nota.permanente2 = body.permanente2,
        nota.parcial = body.parcial,
        nota.final = body.final,
        nota.alumno = body.alumno;
        nota.materia = body.materia;

        nota.save((err, notaGuardada)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar la nota',
                    errors: err
                });
            }

            res.status(201).json({
                ok: true,
                mensaje: 'Nota guardada exitosamente',
                nota: notaGuardada
            });
        });
    });

});

//============================================
//Eliminar una nota
//============================================
app.delete('/:id', mdAutenticacion.verificaToken,(req, res)=>{

    var id = req.params.id;

    Nota.findByIdAndRemove(id, (err, notaBorrada)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la nota',
                errors: err
            });
        }

        if (!notaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una nota con el id ' + id,
                errors: {message:'No existe una nota con ese id'}
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Nota borrada exitosamente',
            nota: notaBorrada
        });
    });

});

module.exports = app;