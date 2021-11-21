const {Router} = require("express");
const router = Router()
const {traerPedidos,crearPedido} = require("../controllers/pedidos.controllers")

router.route('/')
    .get(traerPedidos)
    .post(crearPedido)

module.exports = router