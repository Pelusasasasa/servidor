const {Router} = require("express");
const router = Router();

const {tamanioMovProductos,cargarMovimientoProducto,traerMovProducto} = require("../controllers/movProductos.controllers");

router.route('/')
    .get(tamanioMovProductos)
    .post(cargarMovimientoProducto);

router.route('/:id')
    .get(traerMovProducto)
module.exports = router