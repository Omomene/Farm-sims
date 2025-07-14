const db = require('../db/connection');

// /warehouses
exports.getAllWarehouses = async () => {
  const [rows] = await db.query('SELECT * FROM warehouse');
  return rows;
};