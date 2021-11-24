const {Router} = require("express");
const router = Router();

const {crearProducto,traerProductos,getproducto,modificarProducto,borrarProducto,traerProductosPorRango,stockNegativo} = require("../controllers/productos.controllers");

router.route('/')
    .post(crearProducto)

router.route('/:texto/:tipoBusqueda')
    .get(traerProductos)

router.route('/:id')
    .get(getproducto)
    .put(modificarProducto)
    .delete(borrarProducto)

router.route('/:productosEntreRangos/desde/hasta')
    .get(traerProductosPorRango)
    
module.exports = router