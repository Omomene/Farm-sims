const dao = require('../dao/warehouseDao');

// warehouse
exports.getWarehouses = async () => {
  return await dao.getAllWarehouses();
};
