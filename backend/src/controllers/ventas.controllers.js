const ventasCTRL = {}

const Ventas = require('../models/venta');

ventasCTRL.cargarVenta = async(req,res)=>{
    const venta = new Ventas(req.body);
    venta.save()
    console.log(`Venta ${req.body.nro_comp} guardada`)
    res.send(venta)
}

ventasCTRL.traerVentas = async(req,res)=>{
    const {id} = req.params;
    const venta = await Ventas.find({nro_comp:id})
    res.send(venta)
}

ventasCTRL.modificarVentas = async(req,res) =>{
    const {id} = req.params;
    await Ventas.findByIdAndUpdate({_id:id},req.body)
    console.log(`Venta ${req.body.nro_comp} Modificada`)
    res.send("Venta Modificada")
}
ventasCTRL.entreFechas = async(req,res) => {
    const {desde,hasta} = req.params;
    const ventas = await Ventas.find({$and:[{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(ventas)
}
ventasCTRL.entreFechasConId = async(req,res) => {
    const {id,desde,hasta} = req.params
    const ventaARetornar =  await Ventas.find({$and:[{nro_comp:id},{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(ventaARetornar)
}

ventasCTRL.entreFechasConCliente = async(req,res) => {
    const {idCliente,desde,hasta} = req.params
    const ventaARetornar =  await Ventas.find({$and:[{cliente:idCliente},{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(ventaARetornar)
}

ventasCTRL.traerTamanio = async(req,res) => {
    const ventas = await Ventas.find();
    const tamanio = ventas.length;
    let ultimaVenta;
    if (tamanio !== 0) {
        ultimaVenta = ventas[tamanio-1]._id 
    }else{
        ultimaVenta = 0;
    }
    res.send(`${ultimaVenta }`)
}

ventasCTRL.eliminarVenta = async(req,res)=>{
    const {id} = req.params;
    console.log(req.params)
    const a = await Ventas.findOneAndDelete({nro_comp:id}); 
    console.log(`Venta ${id} Eliminada`);
    res.send("Venta Eliminada");
}

module.exports = ventasCTRL;