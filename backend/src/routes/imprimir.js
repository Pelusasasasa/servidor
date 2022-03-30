const {Router} = require('express');
const router = Router();

const {imprimir} = require('../controllers/imprimir.controllers');

router.route('/')
    .post(imprimir);


module.exports = router