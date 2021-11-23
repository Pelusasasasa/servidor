const {Router} = require("express");
const router = Router();

const {crearProducto,traerProductos,getroducto,modificarProducto,borrarProducto,stockNegativo} = require("../controllers/productos.controllers");

router.route('/')
    .post(crearProducto)

router.route('/:texto/:tipoBusqueda')
    .get(traerProductos)

router.route('/:id')
    .get(getroducto)
    .put(modificarProducto)
    .delete(borrarProducto)

router.route('/:tipoBusqueda')
    .get(stockNegativo)
module.exports = router