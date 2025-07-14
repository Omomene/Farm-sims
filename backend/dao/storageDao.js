const db = require('../db/connection');

//storage
exports.getAllStorageItems = async () => {
  const [rows] = await db.query('SELECT * FROM storage');
  return rows;
};

exports.deleteStorageItemById = async (id) => {
  const [result] = await db.query('DELETE FROM storage WHERE id = ?', [id]);
  return result;
};
