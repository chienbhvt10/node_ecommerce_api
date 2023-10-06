const express = require("express");
const authRouter = require("./auth");
const { apiKey } = require("../middleware/apikey.middleware");
const { checkPermission } = require("../middleware/permissions.middleware");

const router = express.Router();

// check api key
router.use(apiKey);
// check permissions
router.use(checkPermission("0000"));

// router
router.use("/v1/api", authRouter);

module.exports = router;
