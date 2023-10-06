const express = require("express");
const authRouter = require("./auth");
const router = express.Router();

router.use("/v1/api", authRouter);
// router.get("", (req, res, next) => {
//   const wordCompress = "Alo";
//   return res.status(200).json({
//     message: "Hello world",
//     metadata: wordCompress.repeat(10000),
//   });
// });
module.exports = router;
