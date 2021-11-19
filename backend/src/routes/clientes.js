const {Router} = require("express")
const router = Router()

const {traerClientes} = require('../controllers/clientes.controllers')


router.route('/')
    .get()
    .post()
    
router.route('/:nombre')
    .get(traerClientes)
    .put()
    .delete()


    module.exports = router;