const app = require("./src/app");
const { config } = require("./src/configs/config");

app.listen(config.app.port, () => {
  console.log(`Start with port http://localhost:${config.app.port}/`);
});
