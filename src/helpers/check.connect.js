const mongoose = require("mongoose");
const _SECONDS = 5000;
const os = require("os");
const process = require("process");

// count db connections
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log("Number of connections: ", numConnections);
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCore = os.cpus.length; // get number of cores
    const memoryUsage = process.memoryUsage().rss;
    // example maximum number of connections based on number of cores
    const maxConnections = numCore * 5;

    // console.log("Activate connections: ", numConnections);
    // console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnections > maxConnections) {
      // console.log("Connection overloaded detected");
      // notification sent
    }
  }, _SECONDS); // Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverload,
};
