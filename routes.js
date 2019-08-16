const express = require('express');
const router = express.Router();
const EchoController = require('./controllers/EchoController');

router.get('/echo', EchoController.testGet);
router.post('/echo', EchoController.testPost);

module.exports = router;
