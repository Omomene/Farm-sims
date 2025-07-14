const dao = require('../dao/factoriesDao');

// factories
exports.getFactories = async () => {
  return await dao.getAllFactories();
};
