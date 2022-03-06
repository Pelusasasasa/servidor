const cuentaCompCTRL = {};

const CuentaComp = require('../models/CueCorrComp');

cuentaCompCTRL.tamanioCompensadas = async(req,res)=>{
    const compensadas = (await CuentaComp.find());
    let tamanio = compensadas.length
    let ultimaVenta;
    if (tamanio !== 0) {
        ultimaVenta = compensadas[tamanio-1]._id 
    }else{
        ultimaVenta = 0;
    }
    res.send(`${ultimaVenta}`);
}

cuentaCompCTRL.traerCompensada = async(req,res)=>{
    const {id} = req.params;
    const compensada = await CuentaComp.find({nro_comp:id});
    res.send(compensada);
}


cuentaCompCTRL.traerCompensadasPorCliente = async(req,res)=>{
    const {codigo} = req.params;
    const compensadas = await CuentaComp.find({codigo:codigo});
    res.send(compensadas);
}

cuentaCompCTRL.cargarCompensada = async(req,res)=>{
    const nuevaCompensada = new CuentaComp(req.body);
    nuevaCompensada.save();
    res.send("Nueva compensada cargada");
}
cuentaCompCTRL.modificarCompensada = async(req,res)=>{
    const {id} = req.params;
    console.log(req.body)
    const compensada = await CuentaComp.findOneAndUpdate({nro_comp:id},req.body);
    console.log(compensada)
    res.send(`Compensada ${id} Modificada`);
}

cuentaCompCTRL.borrarCompensada = async(req,res)=>{
    const {id} = req.params;
    CuentaComp.findOneAndDelete({_id:id});
    res.send(`Compensada ${id} Eliminada`)
}
module.exports = cuentaCompCTRL