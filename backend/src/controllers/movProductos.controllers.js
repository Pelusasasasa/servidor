const movProductosCTRL = {}

const movProducto = require("../models/movProducto");

movProductosCTRL.traerMovProducto = async(req,res)=>{
    const {id} = req.params;
    const movimientos = await movProducto.find({codProd: id})
    res.send(movimientos)
}

movProductosCTRL.modificarVarios = async(req,res)=>{
    const arreglo = req.body;
    for await(let movimiento of arreglo){
        await movProducto.findOneAndUpdate({_id:movimiento._id},movimiento);
        console.log(`Moviemiento con el id: ${movimiento._id} --- ${movimiento.descripcion} Modificado`)
    }
    res.send("Movimientos modificados")
}


movProductosCTRL.cargarMovimientoProducto = async(req,res)=>{
    let ultimoMovimiento = await movProducto.find().sort({$natural:-1}).limit(1)
    let id =  ultimoMovimiento[0] ? ultimoMovimiento[0]._id : 0;
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
    delete req.body._id;
    await movProducto.findOneAndUpdate({_id:id},req.body);
    console.log(`Movimiento ${id} Modificado`)
    res.send(`Movimiento ${id} Modificado`);
}

module.exports = movProductosCTRL