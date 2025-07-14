const express = require('express');
const { getReservoirs } = require('../controllers/reservoirController');

const router = express.Router();

router.get('/', getReservoirs);

module.exports = router;
