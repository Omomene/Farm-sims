const express = require('express');
const { getGreenhouses } = require('../controllers/greenhouseController');

const router = express.Router();

router.get('/', getGreenhouses);

module.exports = router;
