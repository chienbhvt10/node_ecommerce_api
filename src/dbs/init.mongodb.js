const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const { config } = require("../configs/config");

const connectString = `mongodb+srv://${config.db.username}:${config.db.password}@coursenodejs.jsc6e1r.mongodb.net/`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, {
        maxPoolSize: 50, // nếu vượt quá poolsize thì phải xếp hàng chờ, con số này có thể scale theo độ mạnh của server
      })
      .then((_) => {
        console.log("Connected mongodb success");
        countConnect();
      })
      .catch((err) => console.log(`Connect error: ${err}`));
  }

  static getDBInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getDBInstance();
module.exports = instanceMongodb;
