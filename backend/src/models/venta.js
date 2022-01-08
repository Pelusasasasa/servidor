const {model,Schema} = require("mongoose")


const Venta = new Schema({
    _id:{
        type: Number,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    cliente: {
        type: {},
        required: true
    },
    cod_comp: {
        type: Number,
    },
    tipo_comp: {
        type: String,
        required: false
    },
    nro_comp: {
        type: String,
        required: false
    },
    comprob: {
        type: String,
    },
    productos: {
        type: [],
        required: false
    },
    tipo_pago: String,
    cod_doc: Number, //Blanco
    dnicuit: String, //Blanco
    condIva: String, //Blanco
    pagado: Boolean,
    abonado: {
        type:String,
        default: "0"
    },
    observaciones: {
        type: String,
        default: ""
    },
    descuento: Number,
    precioFinal: {
        type: Number,
        required: true
    },
    vendedor: String,
    empresa: String
})

module.exports = model('Venta',Venta)