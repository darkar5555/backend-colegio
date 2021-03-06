var express = require('express');

var app = express();

var Alumno = require('../models/alumno');

var mdAutenticacion = require('../middlewares/autenticacion');

//===============================
// Get todos los alumnos
//===============================
app.get('/',(req, res, next)=>{

    Alumno.find({})
        .sort({nombre: 1})
        .populate('usuario', 'nombre email role')
        .populate('colegio')
        .exec((err, alumnos)=>{

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando alumnos',
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


//=============================================
//Obtener un alumno de acuardo al id
//=============================================
app.get('/:id', (req, res, next)=>{
    var id = req.params.id;
    Alumno.findById(id)
            .populate('usuario', 'nombre email role')
            .populate('colegio')
            .exec((err, alumno)=>{
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al obtener el alumno',
                        error: err
                    });
                }
                if (!alumno) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El alumno con ese id' + id + 'no existe',
                        errors: {message: 'No existe un alumno con ese ID'}
                    });
                }

                res.status(200).json({
                    ok: true,
                    alumno: alumno
                });
            });
});

//======================================
// Crear a un alumno
//======================================
app.post('/', mdAutenticacion.verificaToken, (req, res, next)=>{

    var body = req.body;
    var alumno = new Alumno({
        nombre: body.nombre,
        apellido_paterno: body.apellido_paterno,
        apellido_materno: body.apellido_materno,
        direccion: body.direccion,
        telefono: body.telefono,
        usuario: body.usuario,
        colegio: body.colegio
    });

    alumno.save((err, alumnoGuardado)=>{

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear alumno',
                errors: err
            });
        }
        
        res.status(201).json({
            ok: true,
            mensaje: 'Alumno guardado',
            alumno: alumnoGuardado
        });
    });
});

//==========================================
//Actualizar un usuario
//==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res, next)=>{

    var id = req.params.id;
    var body = req.body;
    Alumno.findById(id, (err, alumno)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al encontrar usuario',
                errors: err
            });
        }

        if (!alumno) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El alumno con el id' + id + ' no existe',
                    errors: {message: 'No existe un alumno con ese ID'}
                });
            }
        }

        alumno.nombre = body.nombre;
        alumno.apellido_paterno = body.apellido_paterno;
        alumno.apellido_materno = body.apellido_materno;
        alumno.direccion = body.direccion;
        alumno.telefono = body.telefono;
        alumno.usuario = body.usuario;
        alumno.colegio = body.colegio;

        alumno.save((err, alumnoGuardado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar alumno',
                    errors: err
                })
            }
            res.status(200).json({
                ok: true,
                alumno: alumnoGuardado
            });
        });
    });
});


//================================
//Borrar un alumno
//================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;
    Alumno.findByIdAndRemove(id, (err, alumnoBorrado)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar alumno',
                errors: err
            })
        }
        if (!alumnoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un alumno con ese id',
                errors: {message:'No existe un alumno con ese id'}
            })
        }

        res.status(200).json({
            ok: true,
            alumno: alumnoBorrado
        });
    });
});

module.exports = app;