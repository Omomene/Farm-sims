const db = require('../db/connection');

// /warehouses
exports.getAllWarehouses = async () => {
  const [rows] = await db.query(`
    SELECT 
      w.id,
      w.name,
      w.capacity,
      COALESCE(s.quantity, 0) AS stock,
      w.location,
      w.status_message
    FROM warehouses w
    LEFT JOIN storage s ON w.stored_item = s.item_name
  `);
  return rows;
};
