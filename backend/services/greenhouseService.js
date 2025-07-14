const dao = require('../dao/greenhouseDao');

// greenhouse
exports.getGreenhouses = async () => {
  return await dao.getAllGreenhouses();
};
