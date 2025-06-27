const express = require('express');
const router = express.Router();
const { registrar } = require('../controllers/marcacionController');

router.post('/marcar', registrar);

module.exports = router;
