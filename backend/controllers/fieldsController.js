const fieldsService = require('../services/service');

exports.getAllFields = async (req, res) => {
  try {
    const fields = await fieldsService.getAllFields();
    res.json({ fields });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createField = async (req, res) => {
  try {
    const { name, state, crop_id } = req.body;
    const newField = await fieldsService.createField(name, state, crop_id);
    res.status(201).json(newField);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateField = async (req, res) => {
  const fieldId = req.params.id;
  let { name, state, crop_id, busy, remaining } = req.body;

  try {
    await fieldsService.updateField(fieldId, name, state, crop_id, busy, remaining);
    res.json({ message: 'Champ mis à jour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du champ" });
  }
};

exports.startFieldAction = async (req, res) => {
  const fieldId = req.params.id;
  const { action, duration } = req.body;

  try {
    await fieldsService.startFieldAction(fieldId, action, duration);
    res.json({ message: `Action "${action}" started for field ${fieldId}` });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Erreur serveur' });
  }
};

exports.harvestField = async (req, res) => {
  const fieldId = req.params.id;
  try {
    const cropName = await fieldsService.harvestField(fieldId);
    res.status(200).json({ message: `Field harvested and "${cropName}" added to storage` });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Erreur serveur' });
  }
};
