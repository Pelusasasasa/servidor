const {Router} = require("express");
const router = Router();

const {crearProducto,traerProductos,getroducto} = require("../controllers/productos.controllers");

router.route('/')
    .post(crearProducto)

router.route('/:texto/:tipoBusqueda')
    .get(traerProductos)

router.route('/:id')
    .get(getroducto)
module.exports = router