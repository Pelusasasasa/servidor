const productosCTRL = {};

const Productos = require("../models/producto");

productosCTRL.traerProductos = async(req,res)=>{
    const {texto,tipoBusqueda} = req.params;
    const re = new RegExp(`^${texto}`)
    if(texto !== "textoVacio"){
        productos = await Productos.find({[tipoBusqueda]: {$regex: re,$options:'i'}}).sort({descripcion: 1}).limit(50)
    }else{
        productos = await Productos.find().sort({descripcion: 1}).limit(50);
    }
    res.send(productos)
}

productosCTRL.getroducto = async(req,res)=>{
    const {id} = req.params
    console.log(id)
    let producto = await Productos.find({ _id: id })
    res.send(producto[0])
}

productosCTRL.crearProducto = async(req,res)=>{
    const productonuevo = new Productos(req.body);
    await productonuevo.save();
}

productosCTRL.modificarProducto = async(req,res)=>{
    const {id} = req.params;
    const productoModificado = await Productos.findByIdAndUpdate({_id:id},req.body);
}

productosCTRL.borrarProducto = async(req,res)=>{
    const {id} = req.params;
    await Productos.findByIdAndDelete({_id:id})
}

productosCTRL.stockNegativo = async(req,res)=>{
    const {tipoBusqueda} = req.params;
    console.log(tipoBusqueda)
    let productos 
    if (tipoBusqueda === "stockNegativo") {
        productos = await Productos.find({stock:{$lt: 0}})
    }
    console.log(productos)
    res.send(productos)
}

module.exports = productosCTRL;