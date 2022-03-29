const movProductosCTRL = {}

const movProducto = require("../models/movProducto");

movProductosCTRL.traerMovProducto = async(req,res)=>{
    const {id} = req.params;
    const movimientos = await movProducto.find({codProd: id})
    res.send(movimientos)
} 
movProductosCTRL.cargarMovimientoProducto = async(req,res)=>{
    const movimiento = new movProducto(req.body);
    await movimiento.save();
    console.log(`Movimiento ${req.body.descripcion} Cargado`);
    res.send("movimiento guardado");
}


movProductosCTRL.traerMoviemientoPorNumeroYTipo = async(req,res)=>{
    const {numero,tipo} = req.params;
    const movimientos = await movProducto.find({nro_comp:numero,tipo_comp:tipo});
    res.send(movimientos);
}

movProductosCTRL.tamanioMovProductos = async(req,res)=>{
    const movimiento = await movProducto.find();
    tamanio = movimiento.length;
    res.send(`${tamanio}`);
}

movProductosCTRL.modificarMovimiento = async(req,res)=>{
    const {id} = req.params;
    await movProducto.findOneAndUpdate({_id:id},req.body);
    console.log(id)
    res.send(`Movimiento ${id} Modificado`);
}

module.exports = movProductosCTRL