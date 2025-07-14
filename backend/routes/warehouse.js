const express = require('express');
const { getWarehouses } = require('../controllers/warehouseController');

const router = express.Router();

router.get('/', getWarehouses);

module.exports = router;
