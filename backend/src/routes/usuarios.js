const {Router} = require('express')
const { getUsuarios, getUsuario } = require('../controllers/usuarios.controller')
const router = Router() 

router.route('/')
    .get(getUsuarios)
    .post((req,res)=>{
        console.log(req.body)
        res.json({mesagge:"Usuario Traido"})
    })

router.route('/:id')
     .get(getUsuario)
//     .post()
//     .delete()


module.exports = router;