const {Router} = require("express");
const router = Router();

const {cargarVenta,traerVentas,modificarVentas,entreFechas,entreFechasConId,traerTamanio} = require("../controllers/ventas.controllers")

router.route('/')
    .get(traerTamanio)
    .post(cargarVenta)

router.route('/:id')
    .get(traerVentas)
    .put(modificarVentas)

router.route('/:desde/:hasta')
    .get(entreFechas)

router.route('/:id/:desde/:hasta')
    .get(entreFechasConId)


module.exports = router