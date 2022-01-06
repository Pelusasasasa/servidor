const ventasCTRL = {}

const Ventas = require('../models/venta');

ventasCTRL.cargarVenta = async(req,res)=>{
    const venta = new Ventas(req.body);
    venta.save()
    console.log("Venta Guardada")
    res.send(venta)
}

ventasCTRL.traerVentas = async(req,res)=>{
    const {id} = req.params;
    const venta = await Ventas.find({nro_comp:id})
    res.send(venta)
}

ventasCTRL.modificarVentas = async(req,res) =>{
    const {id} = req.params;
    const abonado = req.body.abonado
    const pagado = req.body.pagado
    await Ventas.findByIdAndUpdate({_id:id},req.body)
    res.send("Venta Modificada")
}
ventasCTRL.entreFechas = async(req,res) => {
    const {desde,hasta} = req.params;
    const ventas = await Ventas.find({$and:[{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    console.log(new Date(desde)),
    console.log(new Date(hasta)),
    console.log(ventas)
    res.send(ventas)
}
ventasCTRL.entreFechasConId = async(req,res) => {
    const {id,desde,hasta} = req.params
    const ventaARetornar =  await Ventas.find({$and:[{nro_comp:id},{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(ventaARetornar)
}

ventasCTRL.traerTamanio = async(req,res) => {
    const ventas = await Ventas.find();
    res.send(`${ventas.length }`)
}

ventasCTRL.eliminarVenta = async(req,res)=>{
    const {id} = req.params;
    const a = await Ventas.findByIdAndDelete({nro_comp:id}); 
    res.send("Venta Eliminada");
}

module.exports = ventasCTRL;