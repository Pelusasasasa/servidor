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
    let producto = await Productos.find({ _id: id })
    res.send(producto)
}

productosCTRL.crearProducto = async(req,res)=>{
    const productonuevo = new Productos(req.body);
    await productonuevo.save();
}

module.exports = productosCTRL;