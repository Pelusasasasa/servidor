const pedidosCTRL = {}

const Pedidos = require("../models/pedido")

pedidosCTRL.traerPedidos = async(req,res)=>{
    const pedidos = await Pedidos.find()
    res.send(pedidos)
}

pedidosCTRL.crearPedido = async(req,res)=>{  
    const pedido = new Pedidos(req.body)
    pedido.save()
    res.send("Pedido Guardado")
}

pedidosCTRL.modificarPedido = async(req,res)=>{
    const {id} = req.params;
    await Pedidos.findByIdAndUpdate({_id:id},req.body)
}

pedidosCTRL.eliminarPedido = async(req,res)=>{
    const {id} = req.params
    await Pedidos.findByIdAndDelete({_id:id})
}

module.exports = pedidosCTRL 