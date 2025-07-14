const dao = require('../dao/machinesDao');

// machines
exports.getMachines = async () => {
  return await dao.getAllMachines();
};
