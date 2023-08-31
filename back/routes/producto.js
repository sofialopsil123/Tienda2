'use strict'
var cors = require('cors');

//se usa el pquete express
var express = require ('express');

//se inicializa en controlador del cliente en esta ruta
var productoController = require('../controllers/productoController');


// aqui esta variable inicializa la variable express
var api = express.Router();
var auth = require('../middlewares/authenticate')
var multiparty = require('connect-multiparty');
var path =multiparty({uploadDir:'./uploads/productos'})
// se usa el metod post porque va hacer un registro RELACIONANAD A LA FUNCION DLE CONTRALADOR
api.post('/registro_producto_admin',[auth.auth,path],productoController.registro_producto_admin);
api.get('/listar_productos_admin/:filtro?',auth.auth,productoController.listar_productos_admin);   
api.get('/obtener_portada/:img',productoController.obtener_portada);     
api.get('/obtener_producto_admin/:id',auth.auth,productoController.obtener_producto_admin);
api.put('/actualizar_producto_admin/:id',[auth.auth,path],productoController.actualizar_producto_admin);
api.delete('/eliminar_producto_admin/:id',auth.auth,productoController.eliminar_producto_admin);
//variedades
api.put('/actualizar_producto_variedades_admin/:id',auth.auth,productoController.actualizar_producto_variedades_admin);
//galerias
api.put('/agregar_imagen_galeria_admin/:id',[auth.auth,path],productoController.agregar_imagen_galeria_admin);
api.put('/eliminar_imagen_galeria_admin/:id',auth.auth,productoController.eliminar_imagen_galeria_admin);
// inventarios
api.get('/listar_inventario_producto_admin/:id',auth.auth,productoController.listar_inventario_producto_admin);
api.delete('/eliminar_inventario_producto_admin/:id',auth.auth,productoController.eliminar_inventario_producto_admin)
api.post('/registro_inventario_producto_admin',auth.auth,productoController.registro_inventario_producto_admin)
//rut para listar cliente se usa bajo el metodo get (tomar )

//publicos

//metodos publicos
api.get('/listar_productos_publico/:filtro?',productoController.listar_productos_publico);
api.get('/obtener_productos_slug_publico/:slug',productoController.obtener_productos_slug_publico);
api.get('/listar_productos_recomendados_publico/:categoria',productoController.listar_productos_recomendados_publico);
api.get('/listar_productos_nuevos_publico',productoController.listar_productos_nuevos_publico);
api.get('/listar_productos_masvendidos_publico',productoController.listar_productos_masvendidos_publico);
api.get('/obtener_reviews_producto_publico/:id',productoController.obtener_reviews_producto_publico);


 
module.exports = api;