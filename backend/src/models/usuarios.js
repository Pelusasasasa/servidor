const {Schema, model} = require('mongoose')

const Usuario = new Schema({
    _id: String,
    nombre: String,
    acceso: String
})

module.exports = model("Usuario",Usuario);