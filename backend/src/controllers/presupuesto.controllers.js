const PresupuestoCTRL = {};

const Presupuesto = require("../models/presupuesto");


PresupuestoCTRL.cargarPresupuesto = async(req,res)=>{
    const presupuesto = new Presupuesto(req.body);
    presupuesto.save()
    console.log(`Presupuesto ${req.body.nro_comp} guardado`)
    res.send(presupuesto)
}

PresupuestoCTRL.traerPresupuesto = async(req,res)=>{
    const {id:nro_comp} = req.params;
    const presupuesto = await Presupuesto.find({nro_comp:nro_comp});
    res.send(presupuesto)
}

PresupuestoCTRL.traerTamanio = async(req,res)=>{
    const presupuesto = await Presupuesto.find()
    const tamanio = presupuesto.length;
    res.send(`${tamanio}`)
}

PresupuestoCTRL.modificarPresupuesto = async(req,res) =>{
    console.log(req.params)
    const {id} = req.params;
    const presupuesto = await Presupuesto.findByIdAndUpdate({_id:id},req.body);
    res.send(presupuesto)
}

PresupuestoCTRL.entreFechas = async(req,res)=>{
    const {id,desde,hasta} = req.params;
    const ventaARetornar = await Presupuesto.find({$and:[{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(ventaARetornar)
}

PresupuestoCTRL.entreFechasConId = async(req,res)=> {
    const {id,desde,hasta} = req.params;
    console.log(req.params)
    const ventaARetornar =  await Presupuesto.find({$and:[{nro_comp:id},{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(ventaARetornar)
}
PresupuestoCTRL.entreFechasConCliente = async(req,res) => {
    const {idCliente,desde,hasta} = req.params;
    console.log(req.params)
    const VentaAretornar = await Presupuesto.find({$and:[{cliente:idCliente},{fecha:{$gte: new Date(desde)}},{fecha:{$lte: new Date(hasta)}}]})
    res.send(VentaAretornar);
}

PresupuestoCTRL.eliminarPresupuesto = async(req,res)=>{
    const {id:nro_comp} = req.params;
    console.log(req.params)
    const presupuesto = Presupuesto.findOneAndDelete({nro_comp:nro_comp});
    console.log(`Presupuesto ${nro_comp} Eliminada`);
    res.send("a")
}
module.exports = PresupuestoCTRL