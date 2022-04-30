const express = require("express");

const tdpController = require("./controller/tdpController");

const router = express.Router();

router.post("/tdp/search", tdpController.search);
router.post("/tdp/searchBp", tdpController.searchByPosition);
router.post("/tdp/searchRep", tdpController.searchRep);
router.post("/tdp/create", tdpController.create);
router.put("/tdp/update", tdpController.update);
router.delete("/tdp/delete", tdpController.delete);
router.get("/tdp/updateid", tdpController.updateid);

module.exports = router;
