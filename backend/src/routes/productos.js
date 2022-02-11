const {Router} = require("express");
const router = Router();


const {crearProducto,traerProductos,getproducto,modificarProducto,borrarProducto,productosPorMarca,traerProductosPorRango,stockNegativo,traerMarcas} = require("../controllers/productos.controllers");

router.route('/')
    .post(crearProducto)
    .get(traerMarcas)
router.route('/buscarProducto/:texto/:tipoBusqueda')
    .get(traerProductos)

router.route('/:id')
    .get(getproducto)
    .put(modificarProducto)
    .delete(borrarProducto)

router.route('/:productosEntreRangos/:desde/:hasta')
    .get(traerProductosPorRango)

router.route('/marcas/:marca')
    .get(productosPorMarca)


module.exports = router