var express = require('express');

var Alumno = require('../models/alumno');
var Profesor = require('../models/profesor');
var Clase = require('../models/clase');
var Materia = require('../models/materia');

var app = express();


//================================================
//Busqueda en una coleccion
//================================================
app.get('/coleccion/:tabla/:busqueda', (req, res)=>{

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');
    var promesa;

    switch (tabla) {
      case "alumnos":
        promesa = buscarAlumno(regex);
        break;
      case "profesores":
        promesa = buscarProfesor(regex);
        break;
      case "clases":
        promesa = buscarClase(regex);
        break;
      case "materias":
        promesa = buscarMateria(regex);
        break;
      default:
        return res.status(400).json({
            ok: false,
            mensaje: 'Los tipos de busqueda solo son: alumnos profesores clases y amterias',
            error: {message: 'Tipo de tabla/coleccion no validao'}
        });
    }

    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });

});



//================================================
//Busqueda en todas las colecciones
//================================================
app.get('/todo/:busqueda', (req, res, next)=>{

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([ 
            buscarAlumno(regex),
            buscarProfesor(regex),
            buscarClase(regex),
            buscarMateria(regex)])
            .then(respuestas=>{
                res.status(200).json({
                    ok: true,
                    alumnos: respuestas[0],
                    profesores: respuestas[1],
                    clases: respuestas[2],
                    materias: respuestas[3]
                });
            });
    
});


function buscarAlumno(regex){

    return new Promise((resolve, reject)=>{

        Alumno.find({'nombre': regex}, (err, alumnos)=>{

            if (err) {
                reject('Error al cargar los alumnos', err);
            }else{
                resolve(alumnos);
            }
        });
    });    
};

function buscarProfesor(regex){
    return new Promise((resolve, reject)=>{

        Profesor.find({'nombre': regex}, (err, profesores)=>{
            if (err) {
                reject('Error al cargar los profesores', err);
            }else{
                resolve(profesores);
            }
        });
    });
};

function buscarClase(regex){
    return new Promise((resolve, reject)=>{

        Clase.find() 
            .or([{'nombre': regex}, {'codigo': regex}])
            .exec((err, clases)=>{
            if (err) {
                reject('Error al cargar las clases', err);
            } else {
                resolve(clases)
            }
        });
    });
};

function buscarMateria(regex){

    return new Promise((resolve, reject)=>{
        Materia.find({'nombre': regex}, (err, materias)=>{
            if (err) {
                reject('Error al cargar las materias', err);
            } else {
                resolve(materias);
            }
        });
    });
};

module.exports = app;