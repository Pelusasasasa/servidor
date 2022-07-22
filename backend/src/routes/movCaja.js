const {Router} = require('express');
const router = Router();

const {post} = require('../controllers/movCaja.controllers');

router.route('/')
    .post(post)

module.exports = router