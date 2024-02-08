require("dotenv").config();
const fs = require("fs");
const express = require("express");
const tdpbddConnect = require("./app/tdpSeq");
const geobddConnect = require("./app/geoSeq");
const router = require("./app/router");
const https = require("https");
const privateKey = fs.readFileSync(
  `${process.env.PEM_FILE_LOCATION}privkey.pem`
);
const certificate = fs.readFileSync(
  `${process.env.PEM_FILE_LOCATION}fullchain.pem`
);
const credentials = { key: privateKey, cert: certificate };
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
let isAlexaRequest = false;
(async function () {
  try {
    console.log("Try to connect the tdp database.\nPlease wait...");
    await tdpbddConnect.authenticate();
    console.log("Connection has been established successfully.");

    console.log("Try to connect the geoLock database.\nPlease wait...");
    await geobddConnect.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database.\n", error);
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    if (req.url != "/alexarequest") isAlexaRequest = false;
    else isAlexaRequest = true;
    next();
  });
  app.use(
    isAlexaRequest
      ? (req, res, next) => {
          next();
        }
      : bodyParser.json()
  );
  app.use((req, res, next) => {
    console.log("", req.url);
    next();
  });
  app.use((req, res, next) => {
    //loger(`new incoming "${req.method}" request`)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  app.use((req, res, next) => {
    console.log(">>REQUEST<<", req.url);
    next();
  });
  app.use(router);
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(process.env.PORTHTTPS, () => {
    console.log(`Listening on http://localhost:${process.env.PORTHTTPS}`);
  });
})();
