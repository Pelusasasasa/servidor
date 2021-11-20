const {Router} = require("express")
const router = Router()

const {traerClientes,crearCliente,tamanioArreglo,traerCliente,modificarCliente,eliminarCliente} = require('../controllers/clientes.controllers')


router.route('/')
    .post(crearCliente)
    
router.route('/:identificador')
    .get(traerClientes)
    .put(modificarCliente)
    .delete(eliminarCliente)

router.route('/id/:id')
    .get(traerCliente)


    //se usa para saber el tamaño del codigo de cliente
router.route('/crearCliente/:inicial')
    .get(tamanioArreglo)

    module.exports = router;