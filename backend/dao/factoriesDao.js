const db = require('../db/connection');

// /usines
exports.getAllFactories = async () => {
  const [rows] = await db.query(`
    SELECT 
      f.id,
      f.name,
      f.resources,
      COALESCE(s.quantity, 0) AS stock,
      f.stock_unit,
      f.production,
      f.time_remaining,
      f.status_message
    FROM factories f
    LEFT JOIN storage s ON f.resources = s.item_name
  `);
  return rows;
};


