const greenhouseService = require('../services/greenhouseService');

exports.getGreenhouses = async (req, res) => {
  try {
    const greenhouses = await greenhouseService.getGreenhouses();
    res.json(greenhouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
