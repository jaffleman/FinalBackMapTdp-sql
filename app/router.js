const express = require("express");

const tdpController = require("./controller/tdpController");
const geoController = require("./controller/geoController");

const router = express.Router();

router.post("/tdp/search", tdpController.search);
router.post("/tdp/searchBp", tdpController.searchByPosition);
router.post("/tdp/searchRep", tdpController.searchRep);
router.post("/tdp/create", tdpController.create);
router.put("/tdp/update", tdpController.update);
router.delete("/tdp/delete", tdpController.delete);
router.get("/tdp/updateid", tdpController.updateid);

router.post("/geolock/search", geoController.search);
router.post("/geolock/create", geoController.create);
router.put("/geolock/update", geoController.update);
router.delete("/geolock/delete", geoController.delete);
router.get("/geolock/updateid", geoController.updateid);

module.exports = router;
