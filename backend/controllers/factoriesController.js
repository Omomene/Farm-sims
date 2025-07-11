const factoriesService = require('../services/service');

exports.getFactories = async (req, res) => {
  try {
    const factories = await factoriesService.getFactories();
    res.json(factories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};