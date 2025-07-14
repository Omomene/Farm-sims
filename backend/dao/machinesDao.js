const db = require('../db/connection');

//machines
exports.getAllMachines = async () => {
  const [rows] = await db.query('SELECT * FROM machines');
  return rows;
};

