const pedidosCTRL = {}

const Pedidos = require("../models/pedido")

pedidosCTRL.traerPedidos = async(req,res)=>{
    const pedidos = await Pedidos.find()
    res.send("Pedidos enviados")
}

pedidosCTRL.crearPedido = async(req,res)=>{  
    const pedido = new Pedidos(req.body)
    pedido.save()
    res.send("Pedido Guardado")
}

module.exports = pedidosCTRL 