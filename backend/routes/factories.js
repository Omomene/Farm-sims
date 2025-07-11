const express = require('express');
const { getFactories } = require('../controllers/factoriesController');

const router = express.Router();

router.get('/', getFactories);

module.exports = router;