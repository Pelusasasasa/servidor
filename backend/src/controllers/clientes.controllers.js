const clienteCTRL = {}

const Clientes = require('../models/cliente')

clienteCTRL.traerClientes = async(req,res)=>{
    const {identificador} = req.params
    const re = new RegExp(`^${identificador}`)
    let clientes
    clientes = await Clientes.find({cliente: {$regex: re,$options: 'i'}}).sort({identificador:1}).limit(20)
    res.send(clientes)
}

clienteCTRL.crearCliente = async(req,res)=>{
    const nuevoCliente = new Clientes(req.body)
    await nuevoCliente.save()
    res.send(`Cliente ${nuevoCliente.cliente} Registrado`);
}

clienteCTRL.tamanioArreglo = async(req,res)=>{
    const {inicial} = req.params
    const clientes = await Clientes.find({cliente: new RegExp('^' + inicial,'m')},{_id:1})
    const tamanio = clientes.length;
    clientes[tamanio-1] ? (ultimoCliente = clientes[tamanio-1]._id) : (ultimoCliente = inicial+"000");
    let numero = (parseInt(ultimoCliente.split(`${inicial}`)[1]) + 1).toString();
    console.log(numero)
    numero = numero.padStart(3,"0")
    let retornar = inicial + numero;
    console.log(numero)
    console.log(retornar)
    res.send(retornar)
}
clienteCTRL.traerCliente = async(req,res)=>{
    const {id} = req.params
    const cliente = await Clientes.find({_id:id})
    res.json(cliente[0])
}

clienteCTRL.modificarCliente = async(req,res)=>{
    const {identificador} = req.params;
    const modificado = await Clientes.findByIdAndUpdate({_id:identificador},req.body)
    res.json(modificado)
}

clienteCTRL.eliminarCliente = async(req,res)=>{
    const {identificador} = req.params;
    await Clientes.findByIdAndDelete({_id:identificador})
    res.send(`Cliente ${identificador} Eliminado`)
}
module.exports = clienteCTRL    