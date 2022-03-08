const {Router} = require('express');
const router = Router();

const {tamanioHistorica,cargarHistorica,traerHistoricaId,traerHistoricaCliente,modificarHistorica} = require("../controllers/cueCorrHist.controllers");

router.route('/')
.get(tamanioHistorica)
.post(cargarHistorica)
router.route('/id/:id')
.get(traerHistoricaId)
.put(modificarHistorica)
router.route('/cliente/:id')
.get(traerHistoricaCliente)


module.exports = router