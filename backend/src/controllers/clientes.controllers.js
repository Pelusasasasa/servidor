const clienteCTRL = {}

const cliente = require('../models/cliente')
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
    console.log(`cliente ${req.body.cliente} guardado`)
    res.send(`Cliente ${nuevoCliente.cliente} Registrado`);
}

clienteCTRL.tamanioArreglo = async(req,res)=>{
    const {inicial} = req.params
    const clientes = await Clientes.find({cliente: new RegExp('^' + inicial,'m')},{_id:1})
    const tamanio = clientes.length;
    let numero
    clientes[tamanio-1] ? (numero = (clientes.length.toFixed(0)).padStart(3,"0")) : (numero = "000");
    numero = parseFloat(numero) + 1;
    let retornar = inicial + numero;
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
    console.log(`Cliente ${req.body.cliente} modificado`)
    res.json("Cliente Modificado")
}

clienteCTRL.eliminarCliente = async(req,res)=>{
    const {identificador} = req.params;
    await Clientes.findByIdAndDelete({_id:identificador})
    console.log(`Cliente ${identificador} eliminado`)
    res.send(`Cliente ${identificador} Eliminado`)
}

clienteCTRL.traerClientePorCuit = async(req,res)=>{
    const {cuit} = req.params;
    const cliente = await Clientes.find({cuit:cuit})
    res.send(cliente[0])
}

clienteCTRL.traerClientesConSaldo = async(req,res)=>{
    const clientes = await Clientes.find({$or:[{saldo: {$ne: "0"}},{saldo_p:{$ne: "0"}}]},{_id:1,cliente:1,direccion:1,cond_iva:1,telefono:1,saldo:1,saldo_p:1,localidad:1,cuit:1})
    res.send(clientes)
}
module.exports = clienteCTRL    