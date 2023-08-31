'use strict'

//const { Schema } = require("mongoose");

var mongoose = require('mongoose');
//se crea la variable schema va inicializar el schema,
var Schema = mongoose.Schema;
//se crea una variable para que albergue la otra variable schema

var ProductoSchema = Schema ({
    titulo :{ type:String,required:true },
    slug :{ type:String,required:true },
    galeria:[{type:Object,required:false}],
    portada :{ type:String,required:true },
    precio :{ type:Number,required:true },
    descripcion :{ type:String,required:true },
    contenido :{ type:String,required:true },
    stock :{ type:Number,required:true },
    nventas :{ type:Number,default:0,required:true },
    npuntos :{ type:Number,default:0,required:true },
    variedades: [{type: Object, require:false}],
    titulo_variedad :{ type:String,required:false},
    categoria :{ type:String,required:true },
    estado :{ type:String,default:'Edicion',required:true },
    createdAdAt:{type:Date, default:Date.now, require:true}
})

module.exports = mongoose.model('producto',ProductoSchema);