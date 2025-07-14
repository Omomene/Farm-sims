const db = require('../db/connection');

//fields
exports.fetchAllFields = async () => {
  const [rows] = await db.execute(`
    SELECT f.id, f.name, f.state, f.last_action_time, f.crop_id, f.busy, f.remaining, c.name AS crop_name
    FROM fields f
    LEFT JOIN crops c ON f.crop_id = c.id
  `);
  return rows;
};

exports.insertField = async (name, state, crop_id) => {
  const [result] = await db.execute(
    'INSERT INTO fields (name, state, crop_id) VALUES (?, ?, ?)',
    [name, state, crop_id]
  );
  return result.insertId;
};

exports.updateField = async (id, name, state, crop_id, busy, remaining) => {
  return await db.execute(
    'UPDATE fields SET name = ?, state = ?, crop_id = ?, busy = ?, remaining = ? WHERE id = ?',
    [name, state, crop_id, busy, remaining, id]
  );
};

exports.startAction = async (fieldId, action, duration) => {
  return await db.execute(
    `UPDATE fields SET state = ?, last_action_time = NOW(), busy = TRUE, remaining = ? WHERE id = ?`,
    [action, duration, fieldId]
  );
};

exports.getFieldById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM fields WHERE id = ?', [id]);
  return rows[0];
};

exports.setHarvested = async (id) => {
  return await db.execute('UPDATE fields SET state = ?, crop_id = NULL WHERE id = ?', ['harvested', id]);
};

exports.getCropNameById = async (crop_id) => {
  const [rows] = await db.execute('SELECT name FROM crops WHERE id = ?', [crop_id]);
  return rows[0]?.name;
};

exports.findStorageByName = async (name) => {
  const [rows] = await db.execute('SELECT * FROM storage WHERE item_name = ?', [name]);
  return rows[0];
};

exports.incrementStorage = async (name) => {
  return await db.execute('UPDATE storage SET quantity = quantity + 1 WHERE item_name = ?', [name]);
};

exports.insertStorageItem = async (name) => {
  return await db.execute(
    'INSERT INTO storage (item_name, quantity, item_type) VALUES (?, ?, ?)',
    [name, 1, 'harvested']
  );
};

