const db = require('../db/connection');

// /reservoirs
exports.getAllReservoirs = async () => {
  const [rows] = await db.query('SELECT * FROM reservoir');
  return rows;
};