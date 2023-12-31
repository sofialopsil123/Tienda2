



// aqui donde se inicializa el proyecto

 'use stric'

var express = require('express');
var cors = require('cors');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require ('mongoose');
app.use(cors())
var port =process.env.PORT || 4201;

var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var producto_route = require('./routes/producto');
var cupon_route = require('./routes/cupon');
var config_route = require('./routes/config')




mongoose.set('strictQuery',false);
//aqui se hace la conexion de la base de datos con studio 3t
mongoose.connect('mongodb://127.0.0.1:27017/tienda',{useUnifiedTopology:true, useNewUrlParser:true},(err,res) =>{
    if (err){
        console.log(err);
    }else{
       
        app.listen(port, function(){
            console.log('servidor corriendo en el puerto ' + port );
        });
    }
});

//data informacion del backend al fronted, url pra inicializar el cuerpo de las peticiones atraves de un json

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit:'50mb',extended:true}));

// estos son los permisos de cors entre el backend y frontend haya una buena conexion, los cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//donde s einicliza nuetsra ruta
app.use('/api',cliente_route)
app.use('/api',admin_route)
app.use('/api',producto_route) 
app.use('/api',cupon_route)
app.use('/api',config_route) 
     
module.exports = app;