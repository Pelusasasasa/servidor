const {Router} = require("express");
const router = Router();

const {cargarCompensada,modificarCompensada,borrarCompensada,traerCompensadasPorCliente,traerCompensada} = require("../controllers/cueCorrComp.controllers");

router.route('/')
.post(cargarCompensada)
router.route('/id/:id')
.get(traerCompensada)
.put(modificarCompensada)
.delete(borrarCompensada)
router.route('/cliente/:codigo')
.get(traerCompensadasPorCliente)


module.exports = router