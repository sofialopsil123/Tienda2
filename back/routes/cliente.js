'use strict'
var cors = require('cors');

//se usa el pquete express
var express = require ('express');

//se inicializa en controlador del cliente en esta ruta
var clienteController = require('../controllers/clienteController');


// aqui esta variable inicializa la variable express
var api = express.Router();
var auth = require('../middlewares/authenticate');
const cliente = require('../models/cliente');

// se usa el metod post porque va hacer un registro RELACIONANAD A LA FUNCION DLE CONTRALADOR
api.post('/registro_cliente',clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente);

//rut para listar cliente se usa bajo el metodo get (tomar )

 api.get('/listar_clientes_filtro_admin/:tipo/:filtro',auth.auth, clienteController.listar_clientes_filtro_admin)
 api.post('/registro_cliente_admin',auth.auth,clienteController.registro_cliente_admin); 
 api.get('/obtener_cliente_admin/:id',auth.auth,clienteController.obtener_cliente_admin);
 api.put('/actualizar_cliente_admin/:id',auth.auth,clienteController.actualizar_cliente_admin);
 api.delete('/eliminar_cliente_admin/:id',auth.auth,clienteController.eliminar_cliente_admin);
 api.get('/obtener_cliente_guest/:id',auth.auth,clienteController.obtener_cliente_guest);
 api.put('/actualizar_perfil_cliente_guest/:id',auth.auth,clienteController.actualizar_perfil_cliente_guest);

 
module.exports = api;
