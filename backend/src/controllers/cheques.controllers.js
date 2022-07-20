const chequesCTRL = {};

const Cheque = require('../models/Cheques');

chequesCTRL.post = async(req,res)=>{
    const cheque = new Cheque(req.body);
    await cheque.save();
    res.send(`Cheque numero ${req.body.n_cheque} Cargado`)
};

chequesCTRL.getsAll = async(req,res)=>{
    const cheques = await Cheque.find({},{_id:0,__v:0});
    res.send(cheques);
}

chequesCTRL.put = async(req,res)=>{
    const {numero} = req.params;
    await Cheque.findOneAndUpdate({n_cheque:numero},req.body);
    console.log(`Cheque ${numero} Modificado`);
    res.send(`Cheque ${numero} Modificado`);
}

module.exports = chequesCTRL;