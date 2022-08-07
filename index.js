require("dotenv").config();
const express = require("express");
const tdpbddConnect = require("./app/tdpSeq");
const geobddConnect = require("./app/geoSeq")
const router = require("./app/router");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

(async function () {
  try {
    console.log("Try to connect the tdp database.\nPlease wait...");
    await tdpbddConnect.authenticate();
    console.log("Connection has been established successfully.");

    console.log("Try to connect the geoLock database.\nPlease wait...");
    await geobddConnect.authenticate();
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
