'use strict'//aqui se llama la ruta donde esta el modelo del cliente en nuestro controlador

var Admin = require ('../models/administrador');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt')

const registro_admin = async function(req,res){
    var data = req.body;

    //validation email with array .this is array is empty nobody register with thos is email,the use bcrypt for encrypt password

    var admin_arr=[];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length ==0){
        // 
        if(data.password){
            bcrypt.hash(data.password,null,null, async function (err,hash){
                if(hash){
                    data.password =hash;
                    var reg = await Admin.create(data);
                    
                    res.status(200).send({data:reg});

                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined});

                }

            })

        }else{
            res.status(200).send({message:'No hay una contraseña',data:undefined});

        }
        /* console.log(reg);
        res.status(200).send({data:reg}); */
     
    }else{

        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined});

    }

    //registro
    

}

//login admin

 const login_admin = async function (req,res){
    var data = req.body;
    var admin_arr = [];
    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length ==0){
        res.status(200).send({message:'No se encontro el correo',data:undefined});
    }else{

        //login
        let user = admin_arr [0];

        //encriptar la contraseña y compara la contraseña

        bcrypt.compare(data.password,user.password, async function(error,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token:jwt.createToken(user)//AQUI NOS ENVIA EL TOKEN CUANDO EL USUARIO INGRESE AL SISTEMA
                });
            }else{
                res.status(200).send({message:"La contraseña no coincide", data:undefined})
            }
        })

        
    }


  
}
 

//aqui se exportan todas las funciones

module.exports ={
    registro_admin,
   login_admin 

}

