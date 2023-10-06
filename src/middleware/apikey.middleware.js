const { HEADER } = require("../constants");
const { findById } = require("../services/apikey.service");

// apikey middleware
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    // check objkey
    const objkey = await findById(key);
    if (!objkey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    req.objkey = objkey;
    return next();
  } catch (error) {}
};

module.exports = { apiKey };
