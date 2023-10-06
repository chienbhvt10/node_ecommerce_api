const config = {
  app: {
    port: process.env.APP_PORT || 17042000,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 17042000,
    name: process.env.DB_NAME || "chien",
    username: process.env.DB_USERNAME || "chienzxzx33",
    password: process.env.DB_PASSWORD || "chienbhvt19",
  },
};

module.exports = {
  config,
};
