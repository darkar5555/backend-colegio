var express = require('express');

var app = express();

var Clase = require('../models/clase');

var mdAutenticacion = require('../middlewares/autenticacion');

//==========================================
//Obtener las clase
//==========================================
app.get('/:codigo', (req, res)=>{
    var codigo = req.params.codigo;
    Clase.find({codigo: codigo})
        .sort({ nombre: 1 })
        .populate('alumno', 'nombre apellido_paterno apellido_materno dni direccion telefono')
        .populate('profesor', 'nombre apellido_paterno apellido_materno')
        .exec((err, clases)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener clases',
                    errors: err
                });
            }

            Clase.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    clases: clases,
                    total: conteo
                });
            });
        });
});

app.get('/', (req, res)=>{
    Clase.find({})
        .sort({ codigo: 1 })
        .populate('alumno', 'nombre apellido_paterno apellido_materno')
        .populate('profesor', 'nombre apellido_paterno apellido_materno')
        .exec((err, clases)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener clases',
                    errors: err
                });
            }

            Clase.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    clases: clases,
                    total: conteo
                });
            });
        });
});

//=================================================
//Crear una clase
//=================================================
app.post('/', mdAutenticacion.verificaToken, (req, res)=>{

    var body = req.body;
    var clase = new Clase({
        codigo: body.codigo,
        nombre: body.nombre,
        alumno: body.alumno,
        profesor: body.profesor,
    });

    clase.save((err, claseGuardada)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al guardar la clase',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Clase guardada correctamente',
            clase: claseGuardada
        });
    });

});

//============================================
//Actualizar una clase
//============================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;
    var body = req.body;

    Clase.findById(id, (err, clase)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar la clase',
                errors: err
            });
        }

        if (!clase) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La clase con ese id ' + id + 'no existe',
                });
            }   
        }

        clase.codigo = body.codigo;
        clase.nombre = body.nombre;
        clase.alumno = body.alumno;
        clase.profesor = body.profesor;
        

        clase.save((err, claseGuardada)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la clase',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensajel: 'Actualizado con exito',
                clase: claseGuardada
            });
        });
    });

});


//===================================================
//Eliminar una clase
//===================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;

    Clase.findByIdAndRemove(id, (err, claseBorrada)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar clase',
                errors: err
            });
        }

        if (!claseBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La clase con el id ' + id + ' no existe',
                errors: {message:'No existe una clase con ese id'}
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Clase borrada con exito',
            clase: claseBorrada
        });
    });

});

module.exports = app;