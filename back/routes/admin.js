'use strict'

//se usa el pquete express
var express = require ('express');

//se inicializa en controlador del cliente en esta ruta
var AdminController = require('../controllers/AdminController');

// aqui esta variable inicializa la variable express
var api = express.Router();

// se usa el metod post porque va hacer un registro RELACIONANAD A LA FUNCION DLE CONTRALADOR
api.post('/registro_admin',AdminController.registro_admin);
api.post('/login_admin',AdminController.login_admin); 


module.exports = api;