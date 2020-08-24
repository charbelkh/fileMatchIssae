require('dotenv/config');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./lib/database/index');
const config = require('./configs/config');
const errorMiddleware = require('./middleware/error.middleware');

class App {
  constructor(controllers) {
    this.app = express();

    database.connectToTheDatabase();
    this.initializeMiddleWares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  listen() {
    this.app.listen(config.app.port, () => {
      console.info(`App listening on the port ${config.app.port}`);
    });
  }

  initializeMiddleWares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use(config.contentPath, controller.router);
    });
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

module.exports = App;
