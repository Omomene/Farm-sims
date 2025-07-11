const express = require('express');
const router = express.Router();
const {
  harvestField,
  getAllFields,
  createField,
  updateField,
  startFieldAction,
} = require('../controllers/fieldsController'); 

router.get('/', getAllFields);     
router.post('/', createField);     
router.post('/:id/start-action', startFieldAction);    
router.post('/:id/harvest', harvestField); 
router.post('/:id/update', updateField);

module.exports = router;

