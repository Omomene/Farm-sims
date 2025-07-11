const express = require('express');
const router = express.Router();

const storageController = require('../controllers/storageController');

router.get('/', storageController.getStorageItems);
router.delete('/:id', storageController.deleteStorageItem);

module.exports = router;
