const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
const { checkOverload } = require("./helpers/check.connect");
const router = require("./routes");
require("dotenv").config();
// init middleware

app.use(morgan("dev")); // log server when dev env
// app.use(morgan("dev")); // log server when production env
app.use(helmet()); // hide the header of content request
app.use(compression()); // giảm băng thông cho request bằng việc compress
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
require("./dbs/init.mongodb");
checkOverload();

// init router
app.use("/", router);

// handling errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
