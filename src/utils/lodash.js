const _ = require("lodash");

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

module.exports = {
  getIntoData: getInfoData,
};
