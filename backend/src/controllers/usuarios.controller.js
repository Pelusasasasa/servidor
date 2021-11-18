const usuariosCTRL = {};

usuariosCTRL.getUsuarios = (req,res)=>res.json({mesagge: "Usuarios"})


usuariosCTRL.getUsuario = (req,res)=>{
    const {nombre,id} = req.body
    console.log(req.body)
    res.json({
        _id: "210",
        nombre: "Agustin"
    });
}


module.exports = usuariosCTRL