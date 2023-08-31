'use strict'

//const { Schema } = require("mongoose");

var mongoose = require('mongoose');
//se crea la variable schema va inicializar el schema,
var Schema = mongoose.Schema;
//se crea una variable para que albergue la otra variable schema

var CuponSchema = Schema({
    
    codigo:{type:String, required:true},
    tipo:{type:String, required:true},//valor ne porcentaje |precio fijo
    valor:{type:Number, required:true},//valor ne porcentaje |precio fijo
    limite:{type:Number, required:true},
    createdAdAt:{type:Date, default:Date.now, required:true}
});

module.exports = mongoose.model('cupon',CuponSchema);