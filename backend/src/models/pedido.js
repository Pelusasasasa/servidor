const {model,Schema} = require('mongoose')

const Pedido = new Schema({
    fecha:{
        type: Date,
        default: Date.now
    },
    codigo:{
        type: String,
        required: false
    },
    producto:{
        type: String,
        required: false
    },
    cantidad:{
        type: Number,
        required: false
    },
    cliente:{
        type: String,
        default: ""
    },
    telefono:{
        type: String,
        default: ""
    },
    vendedor: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: false
    },
    estadoPedido: {
        type: String,
        default: "Sin Pedir"
    }
})


module.exports = model('Pedido',Pedido) 