const cuentaHistoricaCTRL = {};

const CuentaHisto = require('../models/CueCorrHist')

cuentaHistoricaCTRL.tamanioHistorica = async(req,res)=>{
   const historica = (await CuentaHisto.find());
    let tamanio = historica.length
    let ultimaVenta;
    if (tamanio !== 0) {
        ultimaVenta = historica[tamanio-1]._id 
    }else{
        ultimaVenta = 0;
    }
    res.send(`${ultimaVenta}`);
}


cuentaHistoricaCTRL.cargarHistorica = async(req,res)=>{
    const historica = new CuentaHisto(req.body);
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
    const historica = await CuentaHisto.findOneAndUpdate(({nro_comp:id}),req.body);
    res.send(`Historica ${id} Modificada`)
}
module.exports = cuentaHistoricaCTRL