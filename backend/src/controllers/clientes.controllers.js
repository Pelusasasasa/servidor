const clienteCTRL = {}

const Clientes = require('../models/cliente')

clienteCTRL.traerClientes = async(req,res)=>{
    const {nombre} = req.params
    const re = new RegExp(`^${nombre}`)
    let clientes
    console.log(re)
    clientes = await Clientes.find({cliente: {$regex: re,$options: 'i'}}).sort({nombre:1}).limit(20)
    res.send(clientes)
}

module.exports = clienteCTRL