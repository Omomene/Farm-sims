const db = require('../db/connection');

// /greenhouses
exports.getAllGreenhouses = async () => {
  const [rows] = await db.query('SELECT * FROM greenhouse');
  return rows;
};