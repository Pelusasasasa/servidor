const {Router} = require("express")
const router = Router()

const {traerClientes,crearCliente,tamanioArreglo,traerCliente,modificarCliente,eliminarCliente,traerClientePorCuit,traerClientesConSaldo} = require('../controllers/clientes.controllers')


router.route('/')
    .get(traerClientesConSaldo)
    .post(crearCliente)
    
router.route('/:identificador')
    .get(traerClientes)
    .put(modificarCliente)
    .delete(eliminarCliente)

router.route('/id/:id')
    .get(traerCliente)

router.route('/cuit/:cuit')
    .get(traerClientePorCuit)

    //se usa para saber el tamaño del codigo de cliente
router.route('/crearCliente/:inicial')
    .get(tamanioArreglo)

    module.exports = router;