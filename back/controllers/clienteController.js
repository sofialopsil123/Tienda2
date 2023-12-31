'use strict'//aqui se llama la ruta donde esta el modelo del cliente en nuestro controlador
var Cliente = require ('../models/cliente');
var bcrypt = require('bcrypt-nodejs');//se usa para encriptar las paswords
var jwt = require('../helpers/jwt')
var cors = require('cors');


//aqui van a estar las funciones en esta funcion se va registrar un cliente 
const registro_cliente= async function(req,res){
    var data = req.body;

    //se valida que no se registre un cliente o usuario con el mismo corre

    var clientes_arr=[];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length ==0){
        // 
        if(data.password){
            bcrypt.hash(data.password,null,null, async function (err,hash){
                if(hash){
                    data.password =hash;
                    var reg = await Cliente.create(data);
                    
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


//aqui la creacion del login del cliente donde el usuario se autentica

const login_cliente = async function (req,res){
    var data = req.body;
    var cliente_arr = [];
    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length ==0){
        res.status(200).send({message:'No se encontro el correo',data:undefined});
    }else{

        //login
        let user = cliente_arr [0];

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

//se crea el metodo listar clientes

const listar_clientes_filtro_admin = async function(req,res){
    console.log(req.user);

    if(req,res){
        if(req.user.role ='admin'){
            let tipo = req.params ['tipo'];
            let filtro = req.params ['filtro'];

            console.log(tipo);

    if(tipo == null | tipo =='null'){
        let reg = await Cliente.find();
        res.status(200).send({data:reg});
    }else{
        if(tipo =='apellidos'){
            let reg = await Cliente.find({apellidos:new RegExp(filtro, 'i')})
            res.status(200).send({data:reg});

        }else if(tipo =='correo'){
            let reg = await Cliente.find({email:new RegExp(filtro, 'i')})
            res.status(200).send({data:reg});

        }
       }
     }else{
        res.status(500).send({message:'NoAccess'})
     }
    }else{
        res.status(500).send({message:'NoAccess'})
    }   
}
   


 const registro_cliente_admin = async function( req,res){
  if(req.user){
    if(req.user.role == 'admin'){
        var data  = req.body;

        bcrypt.hash('123456789', null,null,async function(err,hash){
            if(hash){
                data.password =hash;
                let reg =  await Cliente.create(data);
                res.status(200).send({data:reg});
             
            }else{
                res.status(200).send({message:'Hubo un serro en el servidos',data:undefined})
            }
        })

     }else{
        res.status(500).send({message:'NoAccess'})
      }   
}else{
    res.status(500).send({message:'NoAccess'})
 }
}   



 //aqui esta la funcion para obtener el id del cliente y poderlo actualizar

 const obtener_cliente_admin = async function(req,res){
     if(req.user){
        if(req.user.role == 'admin'){

            var id =req.params['id'];
            
            try{
                //si el identificador tiene el formato correcto me va enviar el registro
                var reg = await Cliente.findById({_id:id});
                res.status(200).send({data:reg});
            }catch(error){
                res.status(200).send({data:undefined});
            }
           
            
            

        }else{
            res.status(500).send({message:'NoAccess'})
        }
        }else{
            res.status(500).send({message:'NoAccess'})
        }   
           
    
         
 }
      
 const actualizar_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){

            var id =req.params['id'];
            var data =req.body;
            var reg =await Cliente.findByIdAndUpdate({_id:id},{
                nombres:data.nombres,
                apellidos:data.apellidos,
                email:data.email,
                telefono:data.telefono,
                f_nacimiento:data.f_nacimiento,
                dni: data.dni,
                genero:data.genero
            })

            res.status(200).send({data:reg})
             

        }else{
            res.status(500).send({message:'NoAccess'})
        }
        }else{
            res.status(500).send({message:'NoAccess'})
        }   
           
    

 }


 const eliminar_cliente_admin = async function (req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id'];

            let reg = await Cliente.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});

             

        }else{
            res.status(500).send({message:'NoAccess'})
        }
        }else{
            res.status(500).send({message:'NoAccess'})
        }   

 }


 //aqui esta el obtener cliente sin restrcciones

 const obtener_cliente_guest= async function(req,res){
    if(req.user){
           var id =req.params['id'];
           
           try{
               //si el identificador tiene el formato correcto me va enviar el registro
               var reg = await Cliente.findById({_id:id});
               res.status(200).send({data:reg});
           }catch(error){
               res.status(200).send({data:undefined});
           }
    

       }else{
           res.status(500).send({message:'NoAccess'})
       }
    }
      
    
//aqui se actualiza la informacion del front en perfil.html y perfil.ts

//metodo api para actualizar el cliente, actualizando documento de la colección de cliente
const actualizar_perfil_cliente_guest = async function(req,res){
    if(req.user){
        
        var id = req.params['id'];
        var data = req.body;

        console.log(data.password);

        if(data.password){
            console.log('con contraseña');
            bcrypt.hash(data.password,null,null, async function(err,hash){
                var reg = await Cliente.findByIdAndUpdate({_id:id}, {
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    f_nacimiento: data.f_nacimiento,
                    dni: data.dni,
                    genero: data.genero,
                    pais: data.pais,
                    password: hash
                });
                res.status(200).send({data:reg});

            });
            res.status(200).send({data:reg});
        }else{
            console.log('sin contraseña');
            var reg = await Cliente.findByIdAndUpdate({_id:id}, {
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero: data.genero,
                pais: data.pais,
    
            });
            res.status(200).send({data:reg});
        }
            
            
    }else{
        res.status(500).send({message: 'NoAccess'});
    }  
}

/**ORDENES */
const obtener_ordenes_cliente = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        let reg = await Venta.find({cliente: id}).sort({createAt: -1});
        
        if(reg.length >=1){
            res.status(200).send({data:reg});
        }else if(reg.length ==0){
            res.status(200).send({data:undefined});
        }

        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_detalles_ordenes_cliente = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        
        try {
            let venta = await Venta.findById({_id:id}).populate('direccion').populate('cliente');
            let detalles = await Dventa.find({venta:id}).populate('producto');

            res.status(200).send({data:venta,detalles:detalles});

        } catch (error) {
            res.status(200).send({data:undefined});
        }
            
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}





/*******************************************************************************/
/*****************************DIRECCIONES*******************************/

const registro_direccion_cliente = async function(req,res){
    if(req.user){
        
        var data = req.body
        //para no dejar más de un true en la dirección principal
        if(data.principal){
            let direcciones = await Direccion.find({cliente:data.cliente});

            direcciones.forEach(async element =>{
                await Direccion.findByIdAndUpdate({_id:element._id},{principal:false});
            });
        }

        let reg = await Direccion.create(data);
        res.status(200).send({data:reg});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

//para listar las direcciones de cliente

const obtener_direccion_todos_cliente = async function(req,res){
    if(req.user){
        
        var id = req.params['id'];
        let direcciones = await Direccion.find({cliente:id}).populate('cliente').sort({createdAt:-1});
        
        res.status(200).send({data:direcciones});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const cambiar_direccion_principal_cliente = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var cliente = req.params['cliente'];

        let direcciones = await Direccion.find({cliente:cliente});

        direcciones.forEach(async element =>{
            await Direccion.findByIdAndUpdate({_id:element._id},{principal:false});
        });
        
        await Direccion.findByIdAndUpdate({_id:id},{principal:true});

       
        res.status(200).send({data:true});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_direccion_principal_cliente = async function(req,res){
    if(req.user){
        
        var id = req.params['id'];
        var direccion = undefined;

        direccion = await Direccion.findOne({cliente:id,principal:true});
        if(direccion == undefined){
            res.status(200).send({data:undefined});
        }else{
            res.status(200).send({data:direccion});
        }
        
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

//CONTACTOOOOOOOOOOOOOOOOO
const enviar_mensaje_contacto = async function(req,res){
    let data = req.body;
    data.estado = 'Abierto';
    let reg = await Contacto.create(data);
    res.status(200).send({data:reg});
}

//REVIEWS
const emitir_review_producto_cliente = async function(req,res){
    if(req.user){
        
        let data = req.body;
        let reg = await Review.create(data);
        res.status(200).send({data:reg});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_review_producto_cliente = async function(req,res){
    
    let id = req.params['id'];
    let reg = await Review.find({producto:id}).sort({createdAt: -1});
    res.status(200).send({data:reg});
}

const obtener_reviews_cliente = async function(req,res){
    if(req.user){
        
        let id = req.params['id'];
        let reg = await Review.find({cliente:id}).populate('cliente');
        res.status(200).send({data:reg});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}
          
   
        

  

 
  

module.exports ={
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin,
    obtener_cliente_guest,
    actualizar_perfil_cliente_guest,
    registro_direccion_cliente,
    obtener_direccion_todos_cliente,
    cambiar_direccion_principal_cliente,
    obtener_direccion_principal_cliente,
    enviar_mensaje_contacto,
    obtener_ordenes_cliente,
    obtener_detalles_ordenes_cliente,
    emitir_review_producto_cliente,
    obtener_review_producto_cliente,
    obtener_reviews_cliente
}
    
