const db = require('../db/connection');

// /greenhouses
exports.getAllGreenhouses = async () => {
  const [rows] = await db.query(`
    SELECT 
      g.id,
      g.name,
      g.plant_type,
      g.area,
      g.current_temperature,
      g.humidity,
      g.status_message
    FROM greenhouses g
  `);
  return rows;
};
