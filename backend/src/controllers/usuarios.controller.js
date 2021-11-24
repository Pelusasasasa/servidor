const usuariosCTRL = {};


const Usuarios = require('../models/usuarios')

usuariosCTRL.getUsuarios = async(req,res)=>{
    const usuarios = await Usuarios.find()
    res.json(usuarios)
}
usuariosCTRL.crearUsuario = async(req,res)=>{
    const nuevoUsuario = new Usuarios(req.body)
    await nuevoUsuario.save()
    res.json("Usuario Guardado")
}

usuariosCTRL.getUsuario =async (req,res)=>{
    const {id} = req.params
    res.send(await Usuarios.findById(id))
}

usuariosCTRL.actualizarUsuario = async(req,res)=>{
    const {id} = req.params
    await Usuarios.findOneAndUpdate({_id:id},req.body)
    res.send("Usuario Modificado")
}

usuariosCTRL.deleteUsuario = async (req,res)=>{
    const {id} = req.params;
    await Usuarios.findByIdAndDelete(id)
    res.send(`Usuario ${id} Eliminado`)
}


module.exports = usuariosCTRL