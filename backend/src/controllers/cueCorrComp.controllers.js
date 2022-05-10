const cuentaCompCTRL = {};

const CuentaComp = require('../models/CueCorrComp');

cuentaCompCTRL.tamanioCompensadas = async(req,res)=>{
    const compensada = (await CuentaComp.find().sort({$natural:-1}).limit(1))[0];
    let ultimaVenta = compensada._id;
    res.send(`${ultimaVenta}`); 
}

cuentaCompCTRL.traerCompensada = async(req,res)=>{
    const {id} = req.params;
    let compensada = await CuentaComp.find({$and:[{nro_comp:id},{saldo:{$ne:0}}]});
    compensada = compensada.filter(compensada=>compensada.saldo !== 0);
    res.send(compensada);
}


cuentaCompCTRL.traerCompensadasPorCliente = async(req,res)=>{
    const {codigo} = req.params;
    let compensadas = await CuentaComp.find({$and:[{codigo:codigo},{saldo:{$ne:0}}]});
    compensadas = compensadas.filter(compensada=>compensada.saldo !== 0);
    res.send(compensadas);
}

cuentaCompCTRL.cargarCompensada = async(req,res)=>{
    const nuevaCompensada = new CuentaComp(req.body);
    nuevaCompensada.save();
    console.log(`Compensada ${req.body.nro_comp} cargada`)
    res.send("Nueva compensada cargada");
}
cuentaCompCTRL.modificarCompensada = async(req,res)=>{
    const {id} = req.params;
    delete req.body._id
    const compensada = await CuentaComp.findOneAndUpdate({nro_comp:id},req.body);
    res.send(`Compensada ${id} Modificada`);
}

cuentaCompCTRL.borrarCompensada = async(req,res)=>{
    const {id} = req.params;
    await CuentaComp.findOneAndDelete({nro_comp:id});
    res.send(`Compensada ${id} Eliminada`);
}
module.exports = cuentaCompCTRL