const {Router} = require("express");
const router = Router();

const {crearProducto,traerProductos,getproducto,modificarProducto,borrarProducto,stockNegativo} = require("../controllers/productos.controllers");

router.route('/')
    .post(crearProducto)

router.route('/:texto/:tipoBusqueda')
    .get(traerProductos)

router.route('/:id')
    .get(getproducto)
    .put(modificarProducto)
    .delete(borrarProducto)
module.exports = router