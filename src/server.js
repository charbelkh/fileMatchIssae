require("dotenv/config");
const App = require("./app");
const UserController = require("./user/user.controller");


const app = new App([
  new UserController()
]);

app.listen();

function registerProcessEvents() {
  process.on("uncaughtException", error => {
    console.error("UncaughtException: ", error);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.info(reason, promise);
  });

  process.on("SIGINT", async () => {
    console.info("Shutting down the application", new Date());
    process.exit(1);
  });
}

registerProcessEvents();