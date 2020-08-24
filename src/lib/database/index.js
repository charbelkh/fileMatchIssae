const mongoose = require('mongoose');
const config = require('../../configs/config');

class MongoDB {
  static connectToTheDatabase() {
    try {
      const database = MongoDB.dataConnection(config.mongo.user, config.mongo.password, config.mongo.host,
        config.mongo.port, config.mongo.name);
      mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const { connection } = mongoose;
      connection.on('connected', () => {
        console.info('Database Connection was Successful');
      });
      connection.on('error', (err) => {
        console.error(`Database Connection Failed ${err}`);
        throw new Error(err);
      });
      connection.on('disconnected', () => console.info('Database Connection Disconnected'));
      return connection;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static dataConnection(user, pass, host, port, name) {
    if (user && pass) {
      return `mongodb://${`${user}:${pass}@`}${host}:${port}/${name}?authSource=admin`;
    }
    return `mongodb://${host}:${port}/${name}`;
  }

  static async closeConnection() {
    if (mongoose.connection) {
      await mongoose.disconnect();
    }
  }
}

module.exports = MongoDB;
