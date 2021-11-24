const tipoVentaCTLR = {};

const TipoVenta = require("../models/tipoVenta")


tipoVentaCTLR.traerVentas = async(req,res)=>{
    const tipoVenta = await TipoVenta.find();
    res.send(tipoVenta[0])
}


tipoVentaCTLR.crearTipoVenta = async(req,res)=>{
    const tipoventa = new TipoVenta(req.body);
    await tipoventa.save()
    res.send("Tipo Venta creado")
}

tipoVentaCTLR.modificarTipoVenta = async(req,res)=>{
    const nuevoTipoVenta = await TipoVenta.findOneAndUpdate(req.body)
    res.send("Numeros Modificados")
}
module.exports = tipoVentaCTLR