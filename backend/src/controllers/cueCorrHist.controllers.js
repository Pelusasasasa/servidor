const cuentaHistoricaCTRL = {};

const CuentaHisto = require('../models/CueCorrHist')

cuentaHistoricaCTRL.cargarHistorica = async(req,res)=>{
    const historica = new CuentaHisto(req.body);
    let id = (await CuentaHisto.find().sort({$natural:-1}).limit(1))[0];
    historica._id = id ? id._id + 1 : 1;
    historica.save();
    console.log(`Historica ${req.body.nro_comp} Guardada`);
    res.send(`Historica ${req.body.nro_comp} Guardada`);
}

cuentaHistoricaCTRL.traerHistoricaId = async(req,res)=>{
    const {id} = req.params;
    const historica = await CuentaHisto.find({nro_comp:id});
    res.send(historica);
}

cuentaHistoricaCTRL.traerHistoricaCliente = async(req,res)=>{
    const {id} = req.params;
    const historicas = await CuentaHisto.find({codigo:id})
    res.send(historicas)
}

cuentaHistoricaCTRL.modificarHistorica = async(req,res)=>{
    const {id} = req.params;
    delete req.body._id
    const historica = await CuentaHisto.updateOne(({nro_comp:id}),req.body);
    res.send(`Historica ${id} Modificada`)
}
cuentaHistoricaCTRL.eliminarCuenta = async(req,res)=>{
    const {id} = req.params;
    const historica = await CuentaHisto.findOneAndDelete({nro_comp:id});
    res.send(historica);
}
module.exports = cuentaHistoricaCTRL