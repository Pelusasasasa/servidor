const {Router} = require("express");
const router = Router();

const {cargarMovimientoProducto,modificarVarios,traerMovProducto,traerMoviemientoPorNumeroYTipo,modificarMovimiento} = require("../controllers/movProductos.controllers");

router.route('/')
    .post(cargarMovimientoProducto)
    .put(modificarVarios)

router.route('/:id')
    .get(traerMovProducto)
    .put(modificarMovimiento)

router.route('/:numero/:tipo')
    .get(traerMoviemientoPorNumeroYTipo)
module.exports = router