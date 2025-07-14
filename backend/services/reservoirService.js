const dao = require('../dao/reservoirDao');

// reservoir
exports.getReservoirs = async () => {
  return await dao.getAllReservoirs();
};
