const storageService = require('../services/service');

exports.getStorageItems = async (req, res) => {
  try {
    const items = await storageService.getStorageItems();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteStorageItem = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await storageService.deleteStorageItem(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};