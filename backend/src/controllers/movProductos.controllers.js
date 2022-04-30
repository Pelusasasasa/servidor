const movProductosCTRL = {}

const movProducto = require("../models/movProducto");

movProductosCTRL.traerMovProducto = async(req,res)=>{
    const {id} = req.params;
    const movimientos = await movProducto.find({codProd: id})
    console.log(movimientos)
    res.send(movimientos)
} 
movProductosCTRL.cargarMovimientoProducto = async(req,res)=>{
    let movimientos = (await movProducto.find());
    let tamanio = movimientos.length;
    let id = movimientos[tamanio-1]._id
    const arreglo = req.body;
    console.log("El id inicial es : " + id)
    for await(let movimiento of arreglo){
        movimiento._id = id + 1;
        id = id + 1;
        const nuevoMovimiento = new movProducto(movimiento);
        await nuevoMovimiento.save();
        console.log(`Movimiento con el id: ${movimiento._id} --- ${movimiento.descripcion} Cargado`);
    }
    res.send("movimientos guardado");
}


movProductosCTRL.traerMoviemientoPorNumeroYTipo = async(req,res)=>{
    const {numero,tipo} = req.params;
    const movimientos = await movProducto.find({nro_comp:numero,tipo_comp:tipo});
    res.send(movimientos);
}

movProductosCTRL.modificarMovimiento = async(req,res)=>{
    const {id} = req.params;
    await movProducto.findOneAndUpdate({_id:id},req.body);
    console.log(`Movimiento ${id} Modificado`)
    res.send(`Movimiento ${id} Modificado`);
}

module.exports = movProductosCTRL