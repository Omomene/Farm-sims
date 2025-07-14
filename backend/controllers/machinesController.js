const machinesService = require('../services/machinesService');

exports.getAllMachines = async (req, res) => {
  try {
    const machines = await machinesService.getMachines();
    console.log("Machines fetched:", machines); // Optional log
    res.json(machines);
  } catch (err) {
    console.error('Error fetching machines:', err);
    res.status(500).json({ error: 'Database error' });
  }
};