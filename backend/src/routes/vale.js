const { Router } = require('express');
const router = Router();

const {post, getAll, impTotal} = require('../controllers/Vale.controllers');

router.route('/')
    .post(post)
    .get(getAll)
router.route('/imptotal')
    .get(impTotal)

module.exports = router
