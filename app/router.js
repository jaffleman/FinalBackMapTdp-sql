const express = require("express");
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require('ask-sdk');

const tdpController = require("./controller/tdpController");
const geoController = require("./controller/geoController");
const skillBuilder = require('./alexa/lambda');
// console.log(skillBuilder);
// const skill = skillBuilder.create();


// const skillBuilder = Alexa.SkillBuilders.custom();
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);


const router = express.Router();

router.post('/alexarequest', adapter.getRequestHandlers());
router.post("/tdp/search", tdpController.search);
router.post("/tdp/searchBp", tdpController.searchByPosition);
router.post("/tdp/searchRep", tdpController.searchRep);
router.post("/tdp/create", tdpController.create);
router.put("/tdp/update", tdpController.update);
router.delete("/tdp/delete", tdpController.delete);
router.get("/tdp/updateid", tdpController.updateid);

router.post("/geolock/create", geoController.create);
router.post("/geolock/findAllMarker", geoController.findAllMarker);
router.post("/geolock/getAllAcces", geoController.getAllAcces);
router.put("/geolock/updateAcces", geoController.updateAcces);
router.put("/geolock/updateMarker", geoController.updateMarker);
router.delete("/geolock/delete", geoController.delete);
router.get("/geolock/updateid", geoController.updateid);

module.exports = router;
