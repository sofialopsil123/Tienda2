'use stric'

/* aqui se llama el paquete jwt para decodificar tokens para verificar que tiene los permisos para 
suficiente spara ingresara  la app */

var jwt = require ('jwt-simple');
var moment = require ('moment'); //se llama el paquete de moment
var secret ='sofialop' //contraseña para encriptar los datos

//se crea una funcion del token va recibir tood el objeto del usuario
exports.createToken = function(user){


    
    var payload = {
        sub: user._id,
        nombres:user.nombres,
        apellidos:user.apellidos,
        email : user.email,
        role:user.rol,
        iat: moment().unix(),//la fecha cuando se creo el token en formato ionix
        exp: moment().add(7,'days').unix() //fecha de expiracion en este caso 7 dias

    }

    return jwt.encode (payload,secret)
}