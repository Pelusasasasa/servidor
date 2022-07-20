const {Router} = require('express');
const router = Router();

const {post, getsAll} = require('../controllers/cheques.controllers');

router.route('/')
    .post(post)
    .get(getsAll)

module.exports = router;
