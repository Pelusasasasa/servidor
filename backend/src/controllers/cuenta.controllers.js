const cuentaCTRL = {};

const Cuenta = require('../models/Cuenta');

cuentaCTRL.post = async(req,res)=>{
    const cuenta = new Cuenta(req.body);
    await cuenta.save();
    res.send(`Cuenta ${req.body.desc} Cargada`);
};

cuentaCTRL.getsAll = async(req,res)=>{
    const cuentas = await Cuenta.find();
    res.send(cuentas);
}

module.exports = cuentaCTRL;