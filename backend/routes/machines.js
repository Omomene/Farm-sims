const express = require('express');
const { getAllMachines } = require('../controllers/machinesController');

const router = express.Router();

router.get('/', getAllMachines);

module.exports = router;