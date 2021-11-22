const {Router} = require("express");
const router = Router();

const {crearProducto,traerProductos} = require("../controllers/productos.controllers");

router.route('/')
    .get(traerProductos)
    .post(crearProducto)

module.exports = router