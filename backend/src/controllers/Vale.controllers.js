const valeCTRL = {};

const Vale = require('../models/Vale');

valeCTRL.post = async(req,res)=>{
    const vale = new Vale(req.body);
    await vale.save();
    res.send(`Vale a ${req.body.rsoc} cargado`);
};

valeCTRL.getAll = async(req,res)=>{
    const vales = await Vale.find();
    res.send(vales);
}

valeCTRL.impTotal = async(req,res)=>{
    const vales = await Vale.find({pago:""},{imp:1,_id:0});
    let total = 0;
    for await(let vale of vales){
        total += vale.imp;
    }
    res.send(`${total}`);
}

module.exports = valeCTRL;