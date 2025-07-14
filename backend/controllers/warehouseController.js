const warehouseService = require('../services/warehouseService');

exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await warehouseService.getWarehouses();
    res.json(warehouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
