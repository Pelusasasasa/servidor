const productosCTRL = {};

const Productos = require("../models/producto");

productosCTRL.traerProductos = async(req,res)=>{
    const {texto,tipoBusqueda} = req.params;
    if(texto[0] === "*"){
            const contenga = texto.substr(1);
            const re = new RegExp(`${contenga}`)
            productos = await Productos.find({[tipoBusqueda]: {$regex: re, $options: 'i'}}).sort({descripcion: 1}).limit(50)
    }else if(texto !== "textoVacio"){
               const re = new RegExp(`^${texto}`)
            productos = await Productos.find({[tipoBusqueda]: {$regex: re,$options:'i'}}).sort({descripcion: 1}).limit(50)
    }else{
            productos = await Productos.find().sort({descripcion: 1}).limit(50);
    }
    res.send(productos)
}

productosCTRL.getproducto = async(req,res)=>{
    const {id} = req.params
    let producto
    if(id === "stockNegativo"){
        productos = await Productos.find({stock:{$lt: 0}})
        res.send(productos)
    }else{
        producto = await Productos.find({ _id: id })
        res.send(producto[0])
    }
}

productosCTRL.crearProducto = async(req,res)=>{
    const productonuevo = new Productos(req.body);
    await productonuevo.save();
    res.send("Producto Cargado")
}

productosCTRL.modificarProducto = async(req,res)=>{
    const {id} = req.params;
    const productoModificado = await Productos.findByIdAndUpdate({_id:id},req.body);
    res.send("Producto Modificado")
}

productosCTRL.borrarProducto = async(req,res)=>{
    const {id} = req.params;
    await Productos.findByIdAndDelete({_id:id})
    res.send("Producto Borrado")
}

productosCTRL.traerProductosPorRango = async(req,res)=>{
    const {desde,hasta} = req.params;
    const productos = await Productos.find({$and: [{_id:{$gte: desde}},{_id:{$lte: hasta}}]});
    res.send(productos);
}

module.exports = productosCTRL;