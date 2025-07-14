const db = require('../db/connection');

// /reservoirs
exports.getAllReservoirs = async () => {
  const [rows] = await db.query(`
    SELECT 
      r.id,
      r.name,
      r.capacity_liters,
      r.current_volume,
      r.water_quality,
      r.status_message
    FROM reservoirs r
  `);
  return rows;
};
