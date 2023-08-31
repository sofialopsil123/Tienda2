'use strict'

//const { Schema } = require("mongoose");

var mongoose = require('mongoose');
//se crea la variable schema va inicializar el schema,
var Schema = mongoose.Schema;
//se crea una variable para que albergue la otra variable schema

var InventarioSchema = Schema({
    producto :{ type:Schema.ObjectId, ref:'producto',required:true },
    cantidad:{type:Number,required:true},
    admin:{ type:Schema.ObjectId, ref:'admin',required:true },
    proveedor:{type:String,required:true}, 
    createdAdAt:{type:Date, default:Date.now, required:true}
});

module.exports = mongoose.model('inventario',InventarioSchema);