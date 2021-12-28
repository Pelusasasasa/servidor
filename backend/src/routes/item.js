const {Router} = require('express');
const router = Router()


const {informacionItem} = require('../controllers/item.controllers')

router.route('/')
.post(informacionItem)

module.exports = router