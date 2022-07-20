const {Router} = require('express');
const router = Router();

const {post} = require('../controllers/tarjeta.controllers');

router.route('/')
    .post(post)

module.exports = router    
