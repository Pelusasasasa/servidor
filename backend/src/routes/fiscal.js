const {Router} = require('express')
const router = Router();

const {informacionFiscal}  =  require('../controllers/fiscal.controllers')

router.route('/')
    .put(informacionFiscal)

module.exports = router;