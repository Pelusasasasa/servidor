const movProductosCTRL = {}

const movProducto = require("../models/movProducto");

movProductosCTRL.traerMovProducto = async(req,res)=>{
    const {id} = req.params;
    const movimientos = await movProducto.find({codProd: id})
    res.send(movimientos)
} 
movProductosCTRL.cargarMovimientoProducto = async(req,res)=>{
    const movimiento = new movProducto(req.body)
    await movimiento.save()
    console.log(`Movimiento ${req.body.descripcion} Cargado`)
    res.send("movimiento guardado")
}

movProductosCTRL.tamanioMovProductos = async(req,res)=>{
    const movimiento = await movProducto.find();
    tamanio = movimiento.length;
    res.send(`${tamanio}`);
}

module.exports = movProductosCTRL