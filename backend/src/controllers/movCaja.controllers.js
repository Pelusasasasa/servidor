const movCajaCTRL = {};

const MovCaja = require('../models/movCaja');

movCajaCTRL.post = async(req,res)=>{
    const movCaja = new MovCaja(req.body);
    await movCaja.save();
    res.send(`Moviemiento de caja Cargado`);
}


module.exports = movCajaCTRL;