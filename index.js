require("dotenv").config();
const express = require("express");
const sequelize = require("./app/sequelize");
const router = require("./app/router");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

(async function () {
  try {
    console.log("Try to connect the database.\nPlease wait...");
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      //loger(`new incoming "${req.method}" request`)
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      );
      next();
    });

    app.use(router);
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database.\n", error);
  }
})();
