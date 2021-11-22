const productosCTRL = {};

const Productos = require("../models/producto");

productosCTRL.traerProductos = async(req,res)=>{
    res.send("Productos")
}

productosCTRL.crearProducto = async(req,res)=>{
    const productonuevo = new Productos(req.body);
    await productonuevo.save();
}

module.exports = productosCTRL;