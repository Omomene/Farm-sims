const reservoirService = require('../services/reservoirService');

exports.getReservoirs = async (req, res) => {
  try {
    const reservoirs = await reservoirService.getReservoirs();
    res.json(reservoirs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
