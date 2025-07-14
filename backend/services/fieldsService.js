const dao = require('../dao/fieldsDao');

// fields
exports.getAllFields = async () => {
  return await dao.fetchAllFields();
};

exports.createField = async (name, state = 'harvested', crop_id = null) => {
  const id = await dao.insertField(name, state, crop_id);
  return { id, name, state, crop_id };
};

exports.updateField = async (id, name, state, crop_id, busy, remaining) => {
  await dao.updateField(id, name, state, crop_id, busy, remaining);
};

exports.startFieldAction = async (id, action, duration) => {
  if (!['plowed', 'sown', 'fertilized'].includes(action)) {
    throw new Error('Invalid action');
  }
  await dao.startAction(id, action, duration);
};

exports.harvestField = async (id) => {
  const field = await dao.getFieldById(id);
  if (!field) throw new Error('Field not found');
  if (field.state !== 'ready' && field.state !== 'sown') throw new Error('Field not ready to harvest');
  if (!field.crop_id) throw new Error('No crop to harvest');

  const cropName = await dao.getCropNameById(field.crop_id);
  if (!cropName) throw new Error('Invalid crop_id');

  await dao.setHarvested(id);

  const storageItem = await dao.findStorageByName(cropName);
  if (storageItem) {
    await dao.incrementStorage(cropName);
  } else {
    await dao.insertStorageItem(cropName);
  }

  return cropName;
};
