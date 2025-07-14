const dao = require('../dao/storageDao');

// storage
exports.getStorageItems = async () => {
  return await dao.getAllStorageItems();
};

exports.deleteStorageItem = async (id) => {
  const result = await dao.deleteStorageItemById(id);
  return result.affectedRows;
};
