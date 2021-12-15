const ventasCTRL = {}

const Ventas = require('../models/venta');

ventasCTRL.cargarVenta = async(req,res)=>{
    const venta = new Ventas(req.body);
    venta.save()
    res.send(venta)
}

ventasCTRL.traerVentas = async(req,res)=>{
    const {id} = req.params;
    const venta = await Ventas.find({_id:id})
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
    res.send(ventas)
}
ventasCTRL.entreFechasConId = async(req,res) => {
    const {id,desde,hasta} = req.params
    const ventaARetornar =  await Ventas.find({$and:[{_id:id},{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(ventaARetornar)
}

ventasCTRL.traerTamanio = async(req,res) => {
    const ventas = await Ventas.find();
    res.send(`${ventas.length   }`)
}

ventasCTRL.eliminarVenta = async(req,res)=>{
    const {id} = req.params;
    const a = await Ventas.findByIdAndDelete({_id:id}); 
    res.send("Venta Eliminada");
}

module.exports = ventasCTRL;