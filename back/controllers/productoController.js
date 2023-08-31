'use strict'//aqui se llama la ruta donde esta el modelo del cliente en nuestro controlador
var Producto = require ('../models/producto');
var Inventario = require ('../models/inventario');
var fs =require('fs');//se usa en el modulo file system que permite traer archivos
var path = require('path');
/* var bcrypt = require('bcrypt-nodejs');//se usa para encriptar las paswords
var jwt = require('../helpers/jwt')
var cors = require('cors'); */



const registro_producto_admin = async function(req,res){
    if(req.res){
    if(req.user.role =='admin'){
        let data = req.body;

        var img_path = req.files.portada.path;
        var name = img_path.split('\\');
        var  portada_name = name[2];
         data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'');
        data.portada =portada_name;
    
        let reg =await Producto.create(data);
        
        let inventario = await Inventario.create({
            admin:req.user.sub,
            cantidad:data.stock,
            proveedor:'primer registro',
            producto: reg._id
        })
        res.status(200).send({data:reg,inventario:inventario})

    }else{
        res.status(500).send({message:'NoAccess'});
    }
    }else{
        res.status(500).send({message:'NoAccess'});
    }

}

 const listar_productos_admin =async function (req,res){
    if(req.res){
        if(req.user.role =='admin'){

            var filtro = req.params['filtro'];
            let reg = await Producto.find({titulo: new RegExp(filtro,'i')});
            res.status(200).send({data:reg});
            
    
        }else{
            res.status(500).send({message:'NoAccess'});
        }
        }else{
            res.status(500).send({message:'NoAccess'});
        }

}
//funcion donde se enlaza la imagen sin que el cliente este logueado
 const obtener_portada = async function(req,res){
    var img = req.params['img'];

    console.log(img);
    fs.stat('./uploads/productos/' + img,function(err){
      if(!err){
        let path_img ='./uploads/productos/'+img;
        res.status(200).sendFile(path.resolve(path_img));
      }else{
        let path_img ='./uploads/default.jpg/';
        res.status(200).sendFile(path.resolve(path_img));

      }
    })

} 



 const obtener_producto_admin = async function(req,res){
        if(req.user){
           if(req.user.role == 'admin'){
   
               var id =req.params['id'];
               
               try{
                   //si el identificador tiene el formato correcto me va enviar el registro
                   var reg = await  Producto.findById({_id:id});
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
            


 
    const actualizar_producto_admin = async function(req,res){
        if(req.res){
        if(req.user.role =='admin'){
            let id = req.params['id'];
            let data = req.body;

          
            if (req.files) {

                // sihay imagen
                var img_path = req.files.portada.path;
                var name = img_path.split('\\');
                var  portada_name = name[2];


                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo:data.titulo,
                    stock:data.stock,
                    precio:data.precio,
                    categoria:data.categoria,
                    descripcion:data.descripcion,
                    contenido:data.contenido,
                    portada:portada_name

                });

                fs.stat('./uploads/productos/' + reg.portada,function(err){
                    if(!err){
                     fs.unlink('./uploads/productos/'+reg.portada,(err)=>{
                        if(err) throw err;
                     });
                    }
                  })
                res.status(200).send({data:reg});
                


                
                
            }else{
                // nohay imagen

                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo:data.titulo,
                    stock:data.stock,
                    precio:data.precio,
                    categoria:data.categoria,
                    descripcion:data.descripcion,
                    contenido:data.contenido,

                });
                res.status(200).send({data:reg});
                
            }
    
        }else{
            res.status(500).send({message:'NoAccess'});
        }
        }else{
            res.status(500).send({message:'NoAccess'});
        }




    
    } 
    
    

    const eliminar_producto_admin = async function (req,res){
        if(req.user){
            if(req.user.role == 'admin'){
                var id = req.params['id'];
    
                let reg = await Producto.findByIdAndRemove({_id:id});
                res.status(200).send({data:reg});
    
                 
    
            }else{
                res.status(500).send({message:'NoAccess'})
            }
            }else{
                res.status(500).send({message:'NoAccess'})
            }   
    
     }

     const listar_inventario_producto_admin = async function(req,res){
        if(req.user){
            if(req.user.role =='admin'){
     
                try{
     
                var id= req.params['id'];
                var reg = await Inventario.find({producto: id}).populate('admin').sort({createdAt:-1});
                res.status(200).send({data:reg});
                }catch(error){
                    console.log(error);
                }
                        
            }else{
                res.status(500).send({message: 'NoAccess'});
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    } 

    const eliminar_inventario_producto_admin = async function (req,res){
        if(req.user){
            if(req.user.role =='admin'){
     
      ////obtener el id del invenntario
                var id= req.params['id'];
 //eliminar el registro del inventario
                let reg = await Inventario.findByIdAndRemove({_id:id});
                 
                //obtener el registro del producto
                let prod = await Producto.findById({_id:reg.producto});
                
                //calcular el nuevo stock
                let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad);

                //actualizacion del nuevo stock al producto
                let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{
                    stock: nuevo_stock
                })
                //se devuelve la data
                res.status(200).send({data:producto})
                        
            }else{
                res.status(500).send({message: 'NoAccess'});
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }


    }
    
    const registro_inventario_producto_admin = async function (req,res){
        if(req.user){
            if(req.user.role =='admin'){

                let data = req.body;

                let reg = await Inventario.create(data);

                 //obtener el registro del producto
                 let prod = await Producto.findById({_id:reg.producto});


                 //calcular el nuevo stock
                   //stock actual                           //stock aumentado
                let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);


                 //actualizacion del nuevo stock al producto
                 let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{
                    stock: nuevo_stock
                })


                res.status(200).send({data:reg});
     
      
 
                        
            }else{
                res.status(500).send({message: 'NoAccess'});
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }


    }



 ///aqui van los metodos publicos como variedades
 
 const actualizar_producto_variedades_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let id = req.params['id'];
            let data = req.body;

            let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                titulo_variedad: data.titulo_variedad,
                variedades: data.variedades
            });
            res.status(200).send({ data: reg });

            /*res.status(200).send({data:reg});*/
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}


const agregar_imagen_galeria_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let id = req.params['id'];
            let data = req.body;

            var img_path = req.files.imagen.path;
            var name = img_path.split('\\');
            var imagen_name = name[2];
            /*res.status(200).send({data:reg});*/

            let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                $push: {
                    galeria: {
                        imagen: imagen_name,
                        _id: data._id
                    }
                }
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}


const eliminar_imagen_galeria_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let id = req.params['id'];
            let data = req.body;
           //push para agregar y pull para eliminar
            let reg = await Producto.findByIdAndUpdate({ _id: id }, { $pull: { galeria: { _id: data._id } } });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//metodos publicos cliente
//metodos publicos

const listar_productos_publico = async function (req, res) {

    var filtro = req.params['filtro'];
    let reg = await Producto.find({ titulo: new RegExp(filtro,'i') });
    res.status(200).send({ data: reg });

}

const obtener_productos_slug_publico = async function (req, res) {
    var slug = req.params['slug'];
    let reg = await Producto.findOne({ slug: slug });
    res.status(200).send({ data: reg });

}

//para productos recomendados, en la tienda
const listar_productos_recomendados_publico = async function (req, res) {
    var categoria = req.params['categoria'];

    let reg = await Producto.find({ categoria: categoria }).sort({ createdAt: -1 }).limit(8);
    res.status(200).send({ data: reg });


}

const listar_productos_nuevos_publico = async function (req, res) {

    let reg = await Producto.find().sort({ createdAt: -1 }).limit(8);
    res.status(200).send({ data: reg });

}

const listar_productos_masvendidos_publico = async function (req, res) {

    let reg = await Producto.find().sort({ nventas: -1 }).limit(8);
    res.status(200).send({ data: reg });

}

const obtener_reviews_producto_publico = async function (req, res) {

    let id = req.params['id'];
    let reviews = await Review.find({ producto: id }).populate('cliente').sort({ createdAt: -1 });
    res.status(200).send({ data: reviews });
}  

   

    

module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin,
    listar_inventario_producto_admin,
    eliminar_inventario_producto_admin,
    registro_inventario_producto_admin,
    actualizar_producto_variedades_admin,
    agregar_imagen_galeria_admin,
    eliminar_imagen_galeria_admin,
    listar_productos_publico,
    obtener_productos_slug_publico,
    listar_productos_recomendados_publico,
    listar_productos_nuevos_publico,
    listar_productos_masvendidos_publico,
    obtener_reviews_producto_publico
   


}


