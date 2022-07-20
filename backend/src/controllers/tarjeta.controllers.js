const tarjetaCTRL = {};

const Tarjeta = require('../models/Tarjeta');

tarjetaCTRL.post = async(req,res)=>{
    const tarjeta = new Tarjeta(req.body);
    await tarjeta.save();
    res.send(`Tarjeta Con el importe ${req.body.imp} de ${req.body.tarjeta} Cargada`)
}

module.exports = tarjetaCTRL;