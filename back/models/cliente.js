'use strict'

//const { Schema } = require("mongoose");

var mongoose = require('mongoose');
//se crea la variable schema va inicializar el schema,
var Schema = mongoose.Schema;
//se crea una variable para que albergue la otra variable schema

var ClienteSchema = Schema ({
    nombres :{ type:String,required:true },
    apellidos :{ type:String,required:true },
    pais :{ type:String,required:false },
    email :{ type:String,required:true },
    password :{ type:String,required:true },
    perfil:{ type:String,default:'perfil.png',required:true },
    telefono :{ type:String,required:false},
    genero:{ type:String,required:false},
    f_nacimiento :{ type:String,required:false},
    dni :{ type:String,required:false},
    createdAdAt:{type:Date, default:Date.now, require:true}
})

module.exports = mongoose.model('Cliente',ClienteSchema);
