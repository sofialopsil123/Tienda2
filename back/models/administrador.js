'use strict'



//const { Schema } = require("mongoose");

var mongoose = require('mongoose');
//se crea la variable schema va inicializar el schema,
var Schema = mongoose.Schema;
//se crea una variable para que albergue la otra variable schema


var AdminSchema = Schema ({
    nombres :{ type:String,required:true },
    apellidos :{ type:String,required:true },
    email :{ type:String,required:true },
    password :{ type:String,required:true },
    telefono :{ type:String,required:true },
    rol :{ type:String,required:true },
    dni :{ type:String,required:true},
    
    
})

module.exports = mongoose.model('admin',AdminSchema);